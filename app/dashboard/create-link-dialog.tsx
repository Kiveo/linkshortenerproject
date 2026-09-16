"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { createLink } from "./actions";

export function CreateLinkDialog() {
	const [open, setOpen] = useState(false);
	const [originalUrl, setOriginalUrl] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);

		startTransition(async () => {
			const result = await createLink(originalUrl);

			if (result.error) {
				setError(result.error);
				return;
			}

			setOriginalUrl("");
			setOpen(false);
		});
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger render={<Button type="button" size="default" className="w-fit" />}>
				Create link
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a short link</DialogTitle>
					<DialogDescription>Paste a URL to generate a new short link.</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="original-url" className="text-sm font-medium">
							Destination URL
						</label>
						<Input
							id="original-url"
							type="url"
							placeholder="https://example.com"
							value={originalUrl}
							onChange={(event) => setOriginalUrl(event.target.value)}
							required
							aria-invalid={Boolean(error)}
						/>
						{error ? <p className="text-sm text-destructive">{error}</p> : null}
					</div>

					<DialogFooter>
						<DialogClose render={<Button type="button" variant="outline" disabled={isPending} />}>
							Cancel
						</DialogClose>
						<Button type="submit" disabled={isPending}>
							{isPending ? "Creating..." : "Create link"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}