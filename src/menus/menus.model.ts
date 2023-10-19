import { Prisma } from "@prisma/client";

export class Menus implements Prisma.tb_menuCreateInput {
    name: string;
    price: string;
    imageSrc: string;
    imageAlt: string;
    menuTypeId: string;

}
