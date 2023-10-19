import { Prisma } from "@prisma/client";


export class Menus implements Prisma.tb_menuCreateInput {
    name: string;
    price: number;
    imageSrc: string;
    imageAlt: string;
}
