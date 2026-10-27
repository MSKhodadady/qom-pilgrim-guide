import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  createPaginatedRowModel,
  rowPaginationFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { placesDestroy, placesIndex, placesStore, placesUpdate } from "api-sdk";
import type { Place, StorePlaceRequest } from "api-sdk/models";
import { useCallback, useMemo } from "react";
import { PlaceDialog } from "@/app/admin/places/PlaceDialog";
import { DataTable } from "@/components/data-table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchWrap } from "@/lib/fetchWrap";
import { useDialog } from "@/lib/hooks/useDialog";
import { qkeys } from "@/lib/qkeys";

const placeFeatures = tableFeatures({
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
});
const placeColumnHelper = createColumnHelper<typeof placeFeatures, Place>();
const emptyPlaces: Place[] = [];

export function Places() {
  const queryClient = useQueryClient();
  const placeDialog = useDialog<Place>();

  const placesQuery = useQuery({
    queryKey: qkeys.places,
    queryFn: async () => {
      const response = await fetchWrap(placesIndex);
      return response?.status === 200 ? response.data.data : null;
    },
  });

  const savePlaceMutation = useMutation({
    mutationFn: async ({
      place,
      values,
    }: {
      place: Place;
      values: StorePlaceRequest;
    }) => {
      if (place.id === -1) {
        const response = await fetchWrap((init) => placesStore(values, init));
        if (response?.status !== 201) {
          throw new Error("ثبت مکان ناموفق بود.");
        }
        return;
      }

      const response = await fetchWrap((init) =>
        placesUpdate(place.id, values, init),
      );
      if (response?.status !== 200) {
        throw new Error("ویرایش مکان ناموفق بود.");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: qkeys.places });
      placeDialog.close();
    },
  });

  const deletePlaceMutation = useMutation({
    mutationFn: async (placeId: number) => {
      const response = await fetchWrap((init) => placesDestroy(placeId, init));
      if (response?.status !== 204) {
        throw new Error("حذف مکان ناموفق بود.");
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: qkeys.places }),
  });

  const openEditPlaceDialog = useCallback(
    (place: Place) => {
      savePlaceMutation.reset();
      placeDialog.show(place);
    },
    [placeDialog.show, savePlaceMutation.reset],
  );

  const deletePlace = useCallback(
    (place: Place) => {
      if (!window.confirm(`مکان «${place.name}» حذف شود؟`)) return;
      deletePlaceMutation.mutate(place.id);
    },
    [deletePlaceMutation.mutate],
  );

  const placeColumns = useMemo(
    () =>
      placeColumnHelper.columns([
        placeColumnHelper.accessor("name", { header: "نام مکان" }),
        placeColumnHelper.accessor("description", {
          header: "توضیحات",
          cell: ({ getValue }) => getValue() || "—",
        }),
        placeColumnHelper.display({
          id: "actions",
          header: "عملیات",
          cell: ({ row }) => (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditPlaceDialog(row.original)}
              >
                ویرایش
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={deletePlaceMutation.isPending}
                onClick={() => deletePlace(row.original)}
              >
                حذف
              </Button>
            </div>
          ),
        }),
      ]),
    [deletePlace, deletePlaceMutation.isPending, openEditPlaceDialog],
  );

  const placesTable = useTable({
    features: placeFeatures,
    columns: placeColumns,
    data: placesQuery.data ?? emptyPlaces,
  });

  return (
    <>
      {placesQuery.isError ? (
        <Alert variant="destructive">
          <AlertDescription>{placesQuery.error.message}</AlertDescription>
        </Alert>
      ) : null}
      {deletePlaceMutation.isError ? (
        <Alert variant="destructive">
          <AlertDescription>
            {deletePlaceMutation.error.message}
          </AlertDescription>
        </Alert>
      ) : null}
      {savePlaceMutation.isError ? (
        <Alert variant="destructive">
          <AlertDescription>{savePlaceMutation.error.message}</AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>مکان‌ها</CardTitle>
          <Button
            onClick={() => {
              savePlaceMutation.reset();
              placeDialog.show({
                id: -1,
                name: "",
                description: null,
                created_at: null,
                updated_at: null,
              });
            }}
          >
            افزودن مکان
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            table={placesTable}
            emptyMessage={
              placesQuery.isPending
                ? "در حال دریافت مکان‌ها..."
                : "مکانی ثبت نشده است."
            }
            pagination={placesTable}
          />
        </CardContent>
      </Card>

      {placeDialog.mounted && (
        <PlaceDialog
          place={placeDialog.value}
          isPending={savePlaceMutation.isPending}
          error={savePlaceMutation.error?.message ?? null}
          onOpenChange={(open) => {
            if (!open) placeDialog.close();
          }}
          onSubmit={(values) => {
            if (placeDialog.value) {
              savePlaceMutation.mutate({
                place: placeDialog.value,
                values,
              });
            }
          }}
        />
      )}
    </>
  );
}
