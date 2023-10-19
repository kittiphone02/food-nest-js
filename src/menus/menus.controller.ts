import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MenusService } from './menus.service';
import { Menus } from './menus.model';

@Controller('menus')
export class MenusController {
    constructor(private readonly menusService: MenusService) {}

    @Get()
    findAllMenus() {
        return this.menusService.findAllMenus();
    }

    @Get(':id')
    findMenuById(@Param('id') id: number) {
        return this.menusService.findMenuById(id);
    }

    @Post()
    createMenu(@Body() data: Menus) {
        return this.menusService.createMenu(data);
    }

    @Put(':id')
    updateMenu(@Param('id') id: number, @Body() data: Menus) {
        return this.menusService.updateMenu(id, data);
    }

    @Delete(':id')
    deleteMenu(@Param('id') id: number) {
        return this.menusService.deleteMenu(id);
    }
}
