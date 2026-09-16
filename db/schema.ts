import { index, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const links = pgTable(
	"links",
	{
		id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
		userId: text("user_id").notNull(),
		originalUrl: text("original_url").notNull(),
		shortCode: varchar("short_code", { length: 16 }).notNull().unique(),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => [index("links_user_id_idx").on(table.userId)],
);
