import { EntryRouteDialog } from "@/app/admin/entry-route-dialog";
import { DataTable } from "@/components/data-table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchWrap } from "@/lib/fetchWrap";
import { useDialog } from "@/lib/hooks/useDialog";
import { qkeys } from "@/lib/qkeys";
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
import { useCallback, useMemo } from "react";

const entryRouteFeatures = tableFeatures({});
const columnHelper = createColumnHelper<
	typeof entryRouteFeatures,
	EntryRoute
>();
const emptyRoutes: EntryRoute[] = [];

export function EntryRoutes() {
	const queryClient = useQueryClient();
	const addEditDialog = useDialog<EntryRoute>();

	const routesQuery = useQuery({
		queryKey: qkeys.entryRoutes,
		queryFn: async () => {
			const response = await fetchWrap(entryRoutesIndex);
			return response?.status === 200 ? response?.data.data : null;
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
				const response = await fetchWrap((init) =>
					entryRoutesUpdate(route.id, values, init),
				);
				if (response?.status !== 200) alert("ناموفق");
			} else {
				const response = await fetchWrap((init) =>
					entryRoutesStore(values, init),
				);
				if (response?.status !== 201) alert("ناموفق");
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: qkeys.entryRoutes });
			addEditDialog.close();
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async (routeId: number) => {
			const response = await fetchWrap((init) =>
				entryRoutesDestroy(routeId, init),
			);
			if (response?.status !== 204) alert("ناموفق");
		},
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: qkeys.entryRoutes }),
	});

	const openEditDialog = useCallback(
		(route: EntryRoute) => {
			saveMutation.reset();
			//
			addEditDialog.show(route);
		},
		[
			saveMutation.reset, //
			addEditDialog.show,
		],
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

	return (
		<>
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
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>مسیرها</CardTitle>

					<Button
						onClick={() => {
							saveMutation.reset();
							//
							addEditDialog.show({
								name: "",
								slug: "",
								id: -1,
								created_at: "",
								sort_order: 1,
								updated_at: "",
							});
						}}
					>
						افزودن مسیر
					</Button>
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

			{addEditDialog.mounted && (
				<EntryRouteDialog
					open={addEditDialog.value}
					isPending={saveMutation.isPending}
					error={saveMutation.error?.message ?? null}
					onOpenChange={(v) => {
						if (!v) addEditDialog.close();
					}}
					onSubmit={(values) =>
						saveMutation.mutate({
							route:
								addEditDialog.value?.id === -1 ? null : addEditDialog.value,
							values,
						})
					}
				/>
			)}
		</>
	);
}
