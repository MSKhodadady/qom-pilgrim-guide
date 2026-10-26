"use client";

import { getAuthToken } from "@/lib/auth";
import { useLayoutEffect } from "react";

export default function AdminPage() {
	useLayoutEffect(() => {
		if (getAuthToken() === null) {
			window.location.href = "/admin/login";
		}
	}, []);
}
