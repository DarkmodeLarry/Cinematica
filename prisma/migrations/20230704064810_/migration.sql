-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    INDEX `Account_userId_idx`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `stripe_customer_id` VARCHAR(191) NULL,
    `stripe_subscription_id` VARCHAR(191) NULL,
    `stripe_price_id` VARCHAR(191) NULL,
    `stripe_current_period_end` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phoneNumber_key`(`phoneNumber`),
    UNIQUE INDEX `User_stripe_customer_id_key`(`stripe_customer_id`),
    UNIQUE INDEX `User_stripe_subscription_id_key`(`stripe_subscription_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `pin` INTEGER NULL,
    `language` ENUM('BAHASA_INDONESIA', 'BAHASA_MELAYU', 'DANSK', 'DEUTSCH', 'ENGLISH', 'ESPANOL', 'FILIPINO', 'FRANCAIS', 'HRVATSKI', 'ITALIANO', 'HINDI', 'BANGLA', 'MAGYAR', 'NEDERLANDS', 'NORSK_BOKMAL', 'POLSKI', 'PORTUGUES', 'ROMANA', 'SUOMI', 'SVENSKA', 'TIENG_VIET', 'TURKCE', 'CESTINA') NOT NULL DEFAULT 'ENGLISH',
    `gameHandle` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `iconId` VARCHAR(191) NOT NULL,

    INDEX `Profile_userId_idx`(`userId`),
    INDEX `Profile_iconId_idx`(`iconId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Icon` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `href` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MyShow` (
    `showId` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `original_title` VARCHAR(191) NULL,
    `poster_path` VARCHAR(191) NULL,
    `backdrop_path` VARCHAR(191) NULL,
    `overview` TEXT NULL,
    `original_language` VARCHAR(191) NOT NULL,
    `media_type` ENUM('movie', 'tv') NOT NULL,
    `status` VARCHAR(191) NULL,
    `tagline` VARCHAR(191) NULL,
    `budget` INTEGER NULL,
    `homepage` VARCHAR(191) NULL,
    `imdb_id` VARCHAR(191) NULL,
    `popularity` DOUBLE NOT NULL,
    `vote_average` DOUBLE NOT NULL,
    `vote_count` INTEGER NOT NULL,
    `release_date` VARCHAR(191) NULL,
    `first_air_date` VARCHAR(191) NULL,
    `last_air_date` VARCHAR(191) NULL,
    `number_of_seasons` INTEGER NULL,
    `number_of_episodes` INTEGER NULL,
    `revenue` INTEGER NULL,
    `runtime` INTEGER NULL,
    `adult` BOOLEAN NOT NULL DEFAULT false,
    `video` BOOLEAN NOT NULL DEFAULT false,
    `profileId` VARCHAR(191) NULL,

    INDEX `MyShow_profileId_idx`(`profileId`),
    PRIMARY KEY (`showId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
