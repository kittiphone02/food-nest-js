import { Controller, Get, Post, Put, Delete, Param, Body, UploadedFile, UseInterceptors, NotFoundException,BadRequestException,Res } from '@nestjs/common';
import { MenusService } from './menus.service';
import { Menus } from './menus.model';
import { FileInterceptor } from '@nestjs/platform-express';
import * as sharp from 'sharp';
import { DeleteMenuDto } from './dto/delete-menu.dto';
import * as fs from 'fs';
import {CreateMenuDto} from "./dto/create-menu.dto";
import {UpdateMenuDto} from "./dto/update-menu.dto"
import * as process from "process";
@Controller('menus')
export class MenusController {
    constructor(private readonly menusService: MenusService) {}


    @Get('images/:imagePath')
    async serveImage(@Param('imagePath') imagePath: string, @Res() res: any) {
        const path = imagePath; // Make sure the path is correctly constructed
        res.sendFile(path, { root: 'uploads' }); // Specify the correct root directory
    }


    @Get()
    async findAllMenus() {
        const menus = await this.menusService.findAllMenus();
        const menusWithImageUrls = menus.map(menu => ({
            ...menu,
            imageUrl: `${process.env.HOST}/menus/images/${menu.imageSrc}`,
        }));
        return menusWithImageUrls;
    }

    @Get(':id')
    findMenuById(@Param('id') id: number) {
        return this.menusService.findMenuById(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('imageSrc'))
    async createMenu(@Body() createMenuDto: CreateMenuDto, @UploadedFile() imageSrc: Express.Multer.File) {
        const resizedImage = await sharp(imageSrc.buffer)
            .resize(1200, 1200)
            .toBuffer();

        const data: Menus = {
            ...createMenuDto,
            imageSrc: `menu_${Date.now()}.jpg`,
        };

        await sharp(resizedImage).toFile(`uploads/${data.imageSrc}`);

        return this.menusService.createMenu(data);
    }


    @Put(':id')
    async updateMenu(@Param('id') id: number, @Body() updateMenuDto: UpdateMenuDto, @UploadedFile() imageSrc: Express.Multer.File) {
        if (imageSrc) {
            const existingMenu = await this.menusService.findMenuById(id);
            if (existingMenu && existingMenu.imageSrc) {
                fs.unlinkSync(`uploads/${existingMenu.imageSrc}`);
            }

            const resizedImage = await sharp(imageSrc.buffer)
                .resize(1200, 1200)
                .toBuffer();

            updateMenuDto.imageSrc = `menu_${Date.now()}.jpg`;
            await sharp(resizedImage).toFile(`uploads/${updateMenuDto.imageSrc}`);
        }

        // return this.menusService.updateMenu(id, updateMenuDto);
    }

    @Delete(':id')
    async deleteMenu(@Param() deleteMenuDto: DeleteMenuDto) {
        const menuId = parseInt(deleteMenuDto.id, 10);
        if (isNaN(menuId)) {
            throw new BadRequestException('Invalid menu ID');
        }

        const existingMenu = await this.menusService.findMenuById(menuId);

        if (!existingMenu) {
            throw new NotFoundException('Menu not found');
        }

        if (existingMenu.imageSrc) {
            fs.unlinkSync(`uploads/${existingMenu.imageSrc}`);
        }

        return this.menusService.deleteMenu(menuId);
    }

}
