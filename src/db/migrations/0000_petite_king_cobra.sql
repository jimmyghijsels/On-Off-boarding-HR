CREATE TABLE `employees` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`department` text NOT NULL,
	`position` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer,
	`status` text DEFAULT 'onboarding' NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `offboarding_tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`employee_id` integer NOT NULL,
	`task_name` text NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`completed_at` integer,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `onboarding_tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`employee_id` integer NOT NULL,
	`task_name` text NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`completed_at` integer,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE cascade
);
