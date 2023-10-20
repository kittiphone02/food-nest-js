-- DropIndex
DROP INDEX `tb_menu_menuTypeId_fkey` ON `tb_menu`;

-- AlterTable
ALTER TABLE `tb_menu` MODIFY `price` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `tb_menu` ADD CONSTRAINT `tb_menu_menuTypeId_fkey` FOREIGN KEY (`menuTypeId`) REFERENCES `tb_menu_type`(`menu_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
