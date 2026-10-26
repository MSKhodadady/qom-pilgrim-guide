"use client";

import { EntryRouteDialog } from "@/app/admin/entry-route-dialog";
import { DataTable } from "@/components/data-table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthToken } from "@/lib/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createColumnHelper,
	tableFeatures,
	useTable,
} from "@tanstack/react-table";
import {
	entryRoutesDestroy,
	entryRoutesIndex,
	entryRoutesStore,
	entryRoutesUpdate,
} from "api-sdk";
import type { EntryRoute, StoreEntryRouteRequest } from "api-sdk/models";
import { useCallback, useEffect, useMemo, useState } from "react";

const entryRouteFeatures = tableFeatures({});
const columnHelper = createColumnHelper<
	typeof entryRouteFeatures,
	EntryRoute
>();
const emptyRoutes: EntryRoute[] = [];
const entryRoutesQueryKey = ["entry-routes"];

function getRequestOptions(): RequestInit {
	const token = getAuthToken();
	if (!token) throw new Error("نشست شما منقضی شده است. دوباره وارد شوید.");
	return { headers: { Authorization: `Bearer ${token}` } };
}

function getResponseMessage(data: unknown, fallback: string) {
	if (data && typeof data === "object" && "message" in data) {
		const message = data.message;
		if (typeof message === "string") return message;
	}
	return fallback;
}

export default function AdminPage() {
	const queryClient = useQueryClient();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editingRoute, setEditingRoute] = useState<EntryRoute | null>(null);

	useEffect(() => {
		if (!getAuthToken()) {
			window.location.href = "/admin/login";
			return;
		}
		setIsAuthenticated(true);
	}, []);

	const routesQuery = useQuery({
		queryKey: entryRoutesQueryKey,
		enabled: isAuthenticated,
		queryFn: async () => {
			const response = await entryRoutesIndex(getRequestOptions());
			if (response.status !== 200) {
				throw new Error(
					getResponseMessage(response.data, "دریافت مسیرها ناموفق بود."),
				);
			}
			return response.data.data;
		},
	});

	const saveMutation = useMutation({
		mutationFn: async ({
			route,
			values,
		}: {
			route: EntryRoute | null;
			values: StoreEntryRouteRequest;
		}) => {
			if (route) {
				const response = await entryRoutesUpdate(
					route.id,
					values,
					getRequestOptions(),
				);
				if (response.status !== 200) {
					throw new Error(
						getResponseMessage(response.data, "ویرایش مسیر ناموفق بود."),
					);
				}
				return;
			}

			const response = await entryRoutesStore(values, getRequestOptions());
			if (response.status !== 201) {
				throw new Error(
					getResponseMessage(response.data, "ایجاد مسیر ناموفق بود."),
				);
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: entryRoutesQueryKey });
			setDialogOpen(false);
			setEditingRoute(null);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async (routeId: number) => {
			const response = await entryRoutesDestroy(routeId, getRequestOptions());
			if (response.status !== 204) {
				throw new Error(
					getResponseMessage(response.data, "حذف مسیر ناموفق بود."),
				);
			}
		},
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: entryRoutesQueryKey }),
	});

	const openCreateDialog = useCallback(() => {
		setEditingRoute(null);
		saveMutation.reset();
		setDialogOpen(true);
	}, [saveMutation.reset]);

	const openEditDialog = useCallback(
		(route: EntryRoute) => {
			setEditingRoute(route);
			saveMutation.reset();
			setDialogOpen(true);
		},
		[saveMutation.reset],
	);

	const deleteRoute = useCallback(
		(route: EntryRoute) => {
			if (!window.confirm(`مسیر «${route.name}» حذف شود؟`)) return;
			deleteMutation.mutate(route.id);
		},
		[deleteMutation.mutate],
	);

	const columns = useMemo(
		() =>
			columnHelper.columns([
				columnHelper.accessor("name", { header: "نام مسیر" }),
				columnHelper.accessor("slug", {
					header: "شناسه",
					cell: ({ getValue }) => <span dir="ltr">{getValue()}</span>,
				}),
				columnHelper.accessor("sort_order", { header: "ترتیب نمایش" }),
				columnHelper.display({
					id: "actions",
					header: "عملیات",
					cell: ({ row }) => (
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => openEditDialog(row.original)}
							>
								ویرایش
							</Button>
							<Button
								variant="destructive"
								size="sm"
								disabled={deleteMutation.isPending}
								onClick={() => deleteRoute(row.original)}
							>
								حذف
							</Button>
						</div>
					),
				}),
			]),
		[deleteMutation.isPending, deleteRoute, openEditDialog],
	);

	const table = useTable({
		features: entryRouteFeatures,
		columns,
		data: routesQuery.data ?? emptyRoutes,
	});

	if (!isAuthenticated) return null;

	return (
		<main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 sm:p-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div>
					<h1 className="text-2xl font-semibold">مدیریت مسیرهای ورودی</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						مسیرهای ورود زائران را مدیریت کنید.
					</p>
				</div>
				<Button onClick={openCreateDialog}>افزودن مسیر</Button>
			</div>

			{routesQuery.isError ? (
				<Alert variant="destructive">
					<AlertDescription>{routesQuery.error.message}</AlertDescription>
				</Alert>
			) : null}
			{deleteMutation.isError ? (
				<Alert variant="destructive">
					<AlertDescription>{deleteMutation.error.message}</AlertDescription>
				</Alert>
			) : null}

			<Card>
				<CardHeader>
					<CardTitle>مسیرها</CardTitle>
				</CardHeader>
				<CardContent>
					<DataTable
						table={table}
						emptyMessage={
							routesQuery.isPending
								? "در حال دریافت مسیرها..."
								: "مسیری ثبت نشده است."
						}
					/>
				</CardContent>
			</Card>

			<EntryRouteDialog
				open={dialogOpen}
				route={editingRoute}
				isPending={saveMutation.isPending}
				error={saveMutation.error?.message ?? null}
				onOpenChange={setDialogOpen}
				onSubmit={(values) =>
					saveMutation.mutate({ route: editingRoute, values })
				}
			/>
		</main>
	);
}
