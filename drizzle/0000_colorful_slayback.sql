CREATE TABLE `user_favorites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`clerk_user_id` text NOT NULL,
	`post_slug` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_favorites_user_slug_idx` ON `user_favorites` (`clerk_user_id`,`post_slug`);--> statement-breakpoint
CREATE INDEX `user_favorites_user_idx` ON `user_favorites` (`clerk_user_id`);
