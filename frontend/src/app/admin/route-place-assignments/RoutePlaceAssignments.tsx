import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  createPaginatedRowModel,
  rowPaginationFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import {
  entryRoutesIndex,
  placesIndex,
  routePlaceAssignmentsDestroy,
  routePlaceAssignmentsIndex,
  routePlaceAssignmentsStore,
  routePlaceAssignmentsUpdate,
  stayModesIndex,
} from "api-sdk";
import type {
  EntryRoute,
  Place,
  RoutePlaceAssignment,
  StayMode,
  StoreRoutePlaceAssignmentRequest,
} from "api-sdk/models";
import { useCallback, useMemo } from "react";
import { RoutePlaceAssignmentDialog } from "@/app/admin/route-place-assignments/RoutePlaceAssignmentDialog";
import { DataTable } from "@/components/data-table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchWrap } from "@/lib/fetchWrap";
import { useDialog } from "@/lib/hooks/useDialog";
import { qkeys } from "@/lib/qkeys";

const assignmentFeatures = tableFeatures({
  rowPaginationFeature: rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
});
const assignmentColumnHelper = createColumnHelper<
  typeof assignmentFeatures,
  RoutePlaceAssignment
>();
const emptyAssignments: RoutePlaceAssignment[] = [];
const emptyPlaces: Place[] = [];
const emptyRoutes: EntryRoute[] = [];
const emptyStayModes: StayMode[] = [];

export function RoutePlaceAssignments() {
  const queryClient = useQueryClient();
  const assignmentDialog = useDialog<RoutePlaceAssignment>();

  const assignmentsQuery = useQuery({
    queryKey: qkeys.routePlaceAssignments,
    queryFn: async () => {
      const response = await fetchWrap((init) =>
        routePlaceAssignmentsIndex(undefined, init),
      );
      return response?.status === 200 ? response.data.data : null;
    },
  });
  const placesQuery = useQuery({
    queryKey: qkeys.places,
    queryFn: async () => {
      const response = await fetchWrap(placesIndex);
      return response?.status === 200 ? response.data.data : null;
    },
  });
  const entryRoutesQuery = useQuery({
    queryKey: qkeys.entryRoutes,
    queryFn: async () => {
      const response = await fetchWrap(entryRoutesIndex);
      return response?.status === 200 ? response.data.data : null;
    },
  });
  const stayModesQuery = useQuery({
    queryKey: qkeys.stayModes,
    queryFn: async () => {
      const response = await fetchWrap(stayModesIndex);
      return response?.status === 200 ? response.data.data : null;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async ({
      assignment,
      values,
    }: {
      assignment: RoutePlaceAssignment;
      values: StoreRoutePlaceAssignmentRequest;
    }) => {
      if (assignment.id === -1) {
        const response = await fetchWrap((init) =>
          routePlaceAssignmentsStore(values, init),
        );
        if (response?.status !== 201) {
          throw new Error("ثبت تخصیص مکان ناموفق بود.");
        }
        return;
      }

      const response = await fetchWrap((init) =>
        routePlaceAssignmentsUpdate(assignment.id, values, init),
      );
      if (response?.status !== 200) {
        throw new Error("ویرایش تخصیص مکان ناموفق بود.");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: qkeys.routePlaceAssignments,
      });
      assignmentDialog.close();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (assignmentId: number) => {
      const response = await fetchWrap((init) =>
        routePlaceAssignmentsDestroy(assignmentId, init),
      );
      if (response?.status !== 204) {
        throw new Error("حذف تخصیص مکان ناموفق بود.");
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: qkeys.routePlaceAssignments,
      }),
  });

  const openEditDialog = useCallback(
    (assignment: RoutePlaceAssignment) => {
      saveMutation.reset();
      assignmentDialog.show(assignment);
    },
    [assignmentDialog.show, saveMutation.reset],
  );

  const deleteAssignment = useCallback(
    (assignment: RoutePlaceAssignment) => {
      if (!window.confirm("این تخصیص مکان حذف شود؟")) return;
      deleteMutation.mutate(assignment.id);
    },
    [deleteMutation.mutate],
  );

  const places = placesQuery.data ?? emptyPlaces;
  const routes = entryRoutesQuery.data ?? emptyRoutes;
  const stayModes = stayModesQuery.data ?? emptyStayModes;
  const placesById = useMemo(
    () => new Map(places.map((place) => [place.id, place])),
    [places],
  );
  const routesById = useMemo(
    () => new Map(routes.map((route) => [route.id, route])),
    [routes],
  );
  const stayModesById = useMemo(
    () => new Map(stayModes.map((stayMode) => [stayMode.id, stayMode])),
    [stayModes],
  );

  const columns = useMemo(
    () =>
      assignmentColumnHelper.columns([
        assignmentColumnHelper.accessor("entry_route_id", {
          header: "مسیر ورودی",
          cell: ({ getValue }) => {
            const routeId = getValue();
            return routesById.get(routeId)?.name ?? routeId;
          },
        }),
        assignmentColumnHelper.accessor("stay_mode_id", {
          header: "شیوه اقامت",
          cell: ({ getValue }) => {
            const stayModeId = getValue();
            return stayModesById.get(stayModeId)?.name ?? stayModeId;
          },
        }),
        assignmentColumnHelper.accessor("place_id", {
          header: "مکان",
          cell: ({ getValue }) => {
            const placeId = getValue();
            return placesById.get(placeId)?.name ?? placeId;
          },
        }),
        assignmentColumnHelper.accessor("role", { header: "نقش" }),
        assignmentColumnHelper.accessor("address", {
          header: "نشانی",
          cell: ({ getValue }) => getValue() || "—",
        }),
        assignmentColumnHelper.accessor("sort_order", {
          header: "ترتیب",
        }),
        assignmentColumnHelper.display({
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
                onClick={() => deleteAssignment(row.original)}
              >
                حذف
              </Button>
            </div>
          ),
        }),
      ]),
    [
      deleteAssignment,
      deleteMutation.isPending,
      openEditDialog,
      placesById,
      routesById,
      stayModesById,
    ],
  );

  const table = useTable({
    features: assignmentFeatures,
    columns,
    data: assignmentsQuery.data ?? emptyAssignments,
  });

  return (
    <>
      {assignmentsQuery.isError ? (
        <Alert variant="destructive">
          <AlertDescription>{assignmentsQuery.error.message}</AlertDescription>
        </Alert>
      ) : null}
      {placesQuery.isError ||
      entryRoutesQuery.isError ||
      stayModesQuery.isError ? (
        <Alert variant="destructive">
          <AlertDescription>
            بارگذاری فهرست مکان‌ها، مسیرها یا شیوه‌های اقامت ناموفق بود.
          </AlertDescription>
        </Alert>
      ) : null}
      {deleteMutation.isError ? (
        <Alert variant="destructive">
          <AlertDescription>{deleteMutation.error.message}</AlertDescription>
        </Alert>
      ) : null}
      {saveMutation.isError ? (
        <Alert variant="destructive">
          <AlertDescription>{saveMutation.error.message}</AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>تخصیص مکان به مسیرها</CardTitle>
          <Button
            disabled={
              placesQuery.isPending ||
              entryRoutesQuery.isPending ||
              stayModesQuery.isPending
            }
            onClick={() => {
              saveMutation.reset();
              assignmentDialog.show({
                id: -1,
                entry_route_id: 0,
                stay_mode_id: 0,
                place_id: 0,
                role: "",
                notes: null,
                address: null,
                sort_order: 0,
                created_at: null,
                updated_at: null,
              });
            }}
          >
            افزودن تخصیص
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            table={table}
            emptyMessage={
              assignmentsQuery.isPending
                ? "در حال دریافت تخصیص‌ها..."
                : "تخصیصی ثبت نشده است."
            }
            pagination={table}
          />
        </CardContent>
      </Card>

      {assignmentDialog.mounted && (
        <RoutePlaceAssignmentDialog
          assignment={assignmentDialog.value}
          places={places}
          entryRoutes={routes}
          stayModes={stayModes}
          isPending={saveMutation.isPending}
          error={saveMutation.error?.message ?? null}
          onOpenChange={(open) => {
            if (!open) assignmentDialog.close();
          }}
          onSubmit={(values) => {
            if (assignmentDialog.value) {
              saveMutation.mutate({
                assignment: assignmentDialog.value,
                values,
              });
            }
          }}
        />
      )}
    </>
  );
}
