-- CreateTable
CREATE TABLE `oauths` (
    `idOauth` INTEGER NOT NULL AUTO_INCREMENT,
    `token` TEXT NOT NULL,
    `refresh` TEXT NOT NULL,
    `expires` TIMESTAMP(6) NOT NULL,
    `ua` VARCHAR(255) NOT NULL DEFAULT '',
    `ip` VARCHAR(64) NOT NULL DEFAULT '::',
    `userId` VARCHAR(36) NOT NULL,
    `device` VARCHAR(36) NOT NULL DEFAULT '',
    `model` VARCHAR(128) NOT NULL DEFAULT '',

    INDEX `userId_key`(`userId`),
    PRIMARY KEY (`idOauth`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `idRole` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(500) NOT NULL DEFAULT '',
    `priority` TINYINT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`idRole`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `idUser` VARCHAR(36) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `firstName` VARCHAR(64) NOT NULL,
    `lastName` VARCHAR(128) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `timeCreated` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `activationKey` VARCHAR(50) NULL,
    `activationCreated` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `lastIp` VARCHAR(20) NULL,
    `lastUserAgent` VARCHAR(255) NULL,
    `isEmailVerified` BOOLEAN NULL DEFAULT false,
    `blockReason` TEXT NULL,
    `phone` VARCHAR(30) NULL,
    `avatarURL` VARCHAR(256) NULL,

    UNIQUE INDEX `uuid`(`idUser`),
    UNIQUE INDEX `email`(`email`),
    INDEX `email_2`(`email`),
    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_oauthsToUsers` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `_oauthsToUsers_AB_unique`(`A`, `B`),
    INDEX `_oauthsToUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_rolesToUsers` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `_rolesToUsers_AB_unique`(`A`, `B`),
    INDEX `_rolesToUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_oauthsToUsers` ADD CONSTRAINT `_oauthsToUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `oauths`(`idOauth`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_oauthsToUsers` ADD CONSTRAINT `_oauthsToUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_rolesToUsers` ADD CONSTRAINT `_rolesToUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `roles`(`idRole`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_rolesToUsers` ADD CONSTRAINT `_rolesToUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;
