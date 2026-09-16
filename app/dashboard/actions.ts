"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createUserLink } from "@/data/links";

const createLinkSchema = z.object({
	originalUrl: z
		.string()
		.trim()
		.max(2048)
		.refine((value) => {
			try {
				const url = new URL(value);
				return (url.protocol === "http:" || url.protocol === "https:") && Boolean(url.hostname);
			} catch {
				return false;
			}
		}, "Enter a valid http(s) URL."),
});

export async function createLink(originalUrl: string) {
	const { userId } = await auth();

	if (!userId) {
		return { error: "You must be signed in to create a link." };
	}

	const result = createLinkSchema.safeParse({ originalUrl });

	if (!result.success) {
		return { error: result.error.issues[0]?.message ?? "Enter a valid http(s) URL." };
	}

	await createUserLink({
		userId,
		originalUrl: result.data.originalUrl,
		shortCode: crypto.randomUUID().replaceAll("-", "").slice(0, 8),
	});

	revalidatePath("/dashboard");
	return { success: true };
}