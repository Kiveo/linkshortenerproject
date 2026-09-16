import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { links } from "@/db/schema";

export async function getUserLinks(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));
}

export async function getLinkByShortCode(shortCode: string) {
  const result = await db
    .select({ originalUrl: links.originalUrl })
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);

  return result[0] ?? null;
}

export async function createUserLink({ userId, originalUrl, shortCode }: {
  userId: string;
  originalUrl: string;
  shortCode: string;
}) {
  return db.insert(links).values({ userId, originalUrl, shortCode }).returning();
}
