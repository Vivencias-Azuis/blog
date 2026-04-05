CREATE TABLE `support_pix_charges` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`provider` text NOT NULL,
	`provider_charge_id` text NOT NULL,
	`source` text NOT NULL,
	`payer_email` text,
	`amount_in_cents` integer NOT NULL,
	`status` text NOT NULL,
	`br_code` text,
	`br_code_base64` text,
	`ticket_url` text,
	`expires_at` text,
	`external_reference` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `support_pix_charges_provider_charge_idx` ON `support_pix_charges` (`provider`,`provider_charge_id`);--> statement-breakpoint
CREATE TABLE `user_favorites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`clerk_user_id` text NOT NULL,
	`post_slug` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_favorites_user_slug_idx` ON `user_favorites` (`clerk_user_id`,`post_slug`);--> statement-breakpoint
CREATE INDEX `user_favorites_user_idx` ON `user_favorites` (`clerk_user_id`);