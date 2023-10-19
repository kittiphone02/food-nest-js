import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';
import { MenusService } from './menus/menus.service';
import { MenusController } from './menus/menus.controller';
import { MenusModule } from './menus/menus.module';
import { PrismaService } from './prisma.service'; // Import the PrismaService

@Module({
  imports: [UsersModule, AuthModule, MenusModule],
  controllers: [MenusController],
  providers: [MenusService, PrismaService], // Add PrismaService here
})
export class AppModule {}
