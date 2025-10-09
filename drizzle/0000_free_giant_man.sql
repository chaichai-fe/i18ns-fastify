CREATE TABLE `business_tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `business_tags_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lang_tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lang_tags_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `translation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`business_tag_id` int NOT NULL,
	`translations` json NOT NULL,
	CONSTRAINT `translation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `translation` ADD CONSTRAINT `translation_business_tag_id_business_tags_id_fk` FOREIGN KEY (`business_tag_id`) REFERENCES `business_tags`(`id`) ON DELETE no action ON UPDATE no action;