import { Prisma } from "@prisma/client";

export class Users implements Prisma.tb_usersCreateInput {
     name: string;
     password: string;
     username: string;
     email: string;
}
