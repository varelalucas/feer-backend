-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `dt_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_username_key`(`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testimonial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `testimonial` VARCHAR(191) NOT NULL,
    `nm_person` VARCHAR(191) NOT NULL,
    `dt_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `val_project` DOUBLE NOT NULL,
    `val_condominium` DOUBLE NOT NULL,
    `val_iptu` DOUBLE NOT NULL,
    `type_project` ENUM('COMPRA', 'ALUGUEL') NOT NULL DEFAULT 'ALUGUEL',
    `st_disponibility` BOOLEAN NOT NULL,
    `nm_project` VARCHAR(191) NOT NULL,
    `ds_project` VARCHAR(191) NOT NULL,
    `address_project` VARCHAR(191) NOT NULL,
    `arr_photos` JSON NOT NULL,
    `arr_drawings` JSON NOT NULL,
    `arr_videos` JSON NOT NULL,
    `val_area` INTEGER NOT NULL,
    `num_bedrooms` INTEGER NOT NULL,
    `num_bathrooms` INTEGER NOT NULL,
    `num_suits` INTEGER NOT NULL,
    `num_garage` INTEGER NOT NULL,
    `pet_friendly` BOOLEAN NOT NULL,
    `dt_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Project_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Portfolio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_portfolio` VARCHAR(191) NOT NULL,
    `ds_portfolio` VARCHAR(191) NOT NULL,
    `arr_photos` JSON NOT NULL,
    `type_portfolio` VARCHAR(191) NOT NULL,
    `val_duration` VARCHAR(191) NOT NULL,
    `nm_client` VARCHAR(191) NOT NULL,
    `dt_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Portfolio_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
