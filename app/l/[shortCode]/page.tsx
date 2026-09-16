import { notFound, redirect } from "next/navigation";

import { getLinkByShortCode } from "@/data/links";

function isSafeRedirectUrl(value: string): boolean {
	try {
		const url = new URL(value);
		return (url.protocol === "http:" || url.protocol === "https:") && Boolean(url.hostname);
	} catch {
		return false;
	}
}

export default async function ShortLinkPage({
	params,
}: {
	params: Promise<{ shortCode: string }>;
}) {
	const { shortCode } = await params;
	const link = await getLinkByShortCode(shortCode);

	if (!link || !isSafeRedirectUrl(link.originalUrl)) {
		notFound();
	}

	redirect(link.originalUrl);
}