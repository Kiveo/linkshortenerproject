"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

type LinkActionsProps = {
	shortUrl: string;
	shortPath: string;
	originalUrl: string;
};

export function LinkActions({ shortUrl, shortPath, originalUrl }: LinkActionsProps) {
	const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

	async function copyUrl(url: string) {
		await navigator.clipboard.writeText(url);
		setCopiedUrl(url);
		window.setTimeout(() => setCopiedUrl(null), 1500);
	}

	return (
		<div className="mt-4 space-y-3 border-t border-border pt-4">
			<div className="flex items-center justify-between gap-3">
				<div className="min-w-0">
					<p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
						Short link
					</p>
					<a
						href={shortUrl}
						target="_blank"
						rel="noreferrer"
						className="mt-1 block truncate text-lg font-medium text-primary underline-offset-4 hover:underline"
					>
						{shortPath}
					</a>
				</div>
				<Button type="button" variant="outline" size="sm" onClick={() => copyUrl(shortUrl)}>
					{copiedUrl === shortUrl ? "Copied" : "Copy short"}
				</Button>
			</div>

			<div className="flex items-center justify-between gap-3">
				<div className="min-w-0">
					<p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
						Long link
					</p>
					<a
						href={originalUrl}
						target="_blank"
						rel="noreferrer"
						className="mt-1 block truncate text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
					>
						{originalUrl}
					</a>
				</div>
				<Button type="button" variant="outline" size="sm" onClick={() => copyUrl(originalUrl)}>
					{copiedUrl === originalUrl ? "Copied" : "Copy long"}
				</Button>
			</div>
		</div>
	);
}