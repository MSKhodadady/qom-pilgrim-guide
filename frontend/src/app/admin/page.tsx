"use client";

import { EntryRoutes } from "./EntryRoutes";
import { Places } from "./Places";

export default function AdminPage() {
	return (
		<main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 sm:p-6">
			<EntryRoutes />

			<Places />
		</main>
	);
}
