import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import {
  stayModesDestroy,
  stayModesIndex,
  stayModesStore,
  stayModesUpdate,
} from "api-sdk";
import type { StayMode, StoreStayModeRequest } from "api-sdk/models";
import { useCallback, useMemo } from "react";
import { StayModeDialog } from "@/app/admin/stay-modes/StayModeDialog";
import { DataTable } from "@/components/data-table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchWrap } from "@/lib/fetchWrap";
import { useDialog } from "@/lib/hooks/useDialog";
import { qkeys } from "@/lib/qkeys";

const stayModeFeatures = tableFeatures({});
const stayModeColumnHelper = createColumnHelper<
  typeof stayModeFeatures,
  StayMode
>();
const emptyStayModes: StayMode[] = [];

export function StayModes() {
  const queryClient = useQueryClient();
  const stayModeDialog = useDialog<StayMode>();

  const stayModesQuery = useQuery({
    queryKey: qkeys.stayModes,
    queryFn: async () => {
      const response = await fetchWrap(stayModesIndex);
      return response?.status === 200 ? response.data.data : null;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async ({
      stayMode,
      values,
    }: {
      stayMode: StayMode;
      values: StoreStayModeRequest;
    }) => {
      if (stayMode.id === -1) {
        const response = await fetchWrap((init) =>
          stayModesStore(values, init),
        );
        if (response?.status !== 201) {
          throw new Error("ثبت شیوه اقامت ناموفق بود.");
        }
        return;
      }

      const response = await fetchWrap((init) =>
        stayModesUpdate(stayMode.id, values, init),
      );
      if (response?.status !== 200) {
        throw new Error("ویرایش شیوه اقامت ناموفق بود.");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: qkeys.stayModes });
      stayModeDialog.close();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (stayModeId: number) => {
      const response = await fetchWrap((init) =>
        stayModesDestroy(stayModeId, init),
      );
      if (response?.status !== 204) {
        throw new Error("حذف شیوه اقامت ناموفق بود.");
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: qkeys.stayModes }),
  });

  const openEditDialog = useCallback(
    (stayMode: StayMode) => {
      saveMutation.reset();
      stayModeDialog.show(stayMode);
    },
    [saveMutation.reset, stayModeDialog.show],
  );

  const deleteStayMode = useCallback(
    (stayMode: StayMode) => {
      if (!window.confirm(`شیوه اقامت «${stayMode.name}» حذف شود؟`)) return;
      deleteMutation.mutate(stayMode.id);
    },
    [deleteMutation.mutate],
  );

  const columns = useMemo(
    () =>
      stayModeColumnHelper.columns([
        stayModeColumnHelper.accessor("name", { header: "نام شیوه اقامت" }),
        stayModeColumnHelper.accessor("slug", {
          header: "شناسه",
          cell: ({ getValue }) => <span dir="ltr">{getValue()}</span>,
        }),
        stayModeColumnHelper.display({
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
                onClick={() => deleteStayMode(row.original)}
              >
                حذف
              </Button>
            </div>
          ),
        }),
      ]),
    [deleteMutation.isPending, deleteStayMode, openEditDialog],
  );

  const table = useTable({
    features: stayModeFeatures,
    columns,
    data: stayModesQuery.data ?? emptyStayModes,
  });

  return (
    <>
      {stayModesQuery.isError ? (
        <Alert variant="destructive">
          <AlertDescription>{stayModesQuery.error.message}</AlertDescription>
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
          <CardTitle>شیوه‌های اقامت</CardTitle>
          <Button
            onClick={() => {
              saveMutation.reset();
              stayModeDialog.show({
                id: -1,
                name: "",
                slug: "",
                created_at: null,
                updated_at: null,
              });
            }}
          >
            افزودن شیوه اقامت
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            table={table}
            emptyMessage={
              stayModesQuery.isPending
                ? "در حال دریافت شیوه‌های اقامت..."
                : "شیوه اقامتی ثبت نشده است."
            }
          />
        </CardContent>
      </Card>

      {stayModeDialog.mounted && (
        <StayModeDialog
          stayMode={stayModeDialog.value}
          isPending={saveMutation.isPending}
          error={saveMutation.error?.message ?? null}
          onOpenChange={(open) => {
            if (!open) stayModeDialog.close();
          }}
          onSubmit={(values) => {
            if (stayModeDialog.value) {
              saveMutation.mutate({
                stayMode: stayModeDialog.value,
                values,
              });
            }
          }}
        />
      )}
    </>
  );
}
