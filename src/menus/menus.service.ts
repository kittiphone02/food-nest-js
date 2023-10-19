import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Menus } from './menus.model';

@Injectable()
export class MenusService {
    constructor(private prisma: PrismaService) {}



    async createMenu(data: Menus) {
        return this.prisma.tb_menu.create({ data });
    }

    async findAllMenus() {
        return this.prisma.tb_menu.findMany();
    }

    async findMenuById(id: number) {
        return this.prisma.tb_menu.findUnique({
            where: { id },
        });
    }

    // async updateMenu(id: number, data: Menus) {
    //     return this.prisma.tb_menu.update({
    //         where: { id },
    //         data,
    //     });
    // }

    async deleteMenu(id: number) {
        return this.prisma.tb_menu.delete({
            where: { id },
        });
    }
}
