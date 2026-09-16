"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createUserLink } from "@/data/links";

const createLinkSchema = z.object({
	originalUrl: z.url("Enter a valid URL.").max(2048),
});

export async function createLink(originalUrl: string) {
	const { userId } = await auth();

	if (!userId) {
		return { error: "You must be signed in to create a link." };
	}

	const result = createLinkSchema.safeParse({ originalUrl });

	if (!result.success) {
		return { error: result.error.issues[0]?.message ?? "Enter a valid URL." };
	}

	await createUserLink({
		userId,
		originalUrl: result.data.originalUrl,
		shortCode: crypto.randomUUID().replaceAll("-", "").slice(0, 8),
	});

	revalidatePath("/dashboard");
	return { success: true };
}