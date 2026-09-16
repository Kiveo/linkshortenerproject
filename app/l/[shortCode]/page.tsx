import { notFound, redirect } from "next/navigation";

import { getLinkByShortCode } from "@/data/links";

export default async function ShortLinkPage({
	params,
}: {
	params: Promise<{ shortCode: string }>;
}) {
	const { shortCode } = await params;
	const link = await getLinkByShortCode(shortCode);

	if (!link) {
		notFound();
	}

	redirect(link.originalUrl);
}