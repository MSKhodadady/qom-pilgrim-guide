"use client";

import { Combobox } from "@base-ui/react/combobox";
import type {
  EntryRoute,
  Place,
  RoutePlaceAssignment,
  StayMode,
  StoreRoutePlaceAssignmentRequest,
} from "api-sdk/models";
import { type SubmitEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RoutePlaceAssignmentDialogProps = {
  assignment: RoutePlaceAssignment | null;
  places: Place[];
  entryRoutes: EntryRoute[];
  stayModes: StayMode[];
  isPending: boolean;
  error: string | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: StoreRoutePlaceAssignmentRequest) => void;
};

export function RoutePlaceAssignmentDialog({
  assignment,
  places,
  entryRoutes,
  stayModes,
  isPending,
  error,
  onOpenChange,
  onSubmit,
}: RoutePlaceAssignmentDialogProps) {
  const [entryRouteId, setEntryRouteId] = useState("");
  const [stayModeId, setStayModeId] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [role, setRole] = useState("");
  const [notes, setNotes] = useState("");
  const [address, setAddress] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [placeError, setPlaceError] = useState<string | null>(null);

  useEffect(() => {
    setEntryRouteId(
      assignment && assignment.id !== -1
        ? String(assignment.entry_route_id)
        : "",
    );
    setStayModeId(
      assignment && assignment.id !== -1 ? String(assignment.stay_mode_id) : "",
    );
    setSelectedPlace(
      assignment && assignment.id !== -1
        ? (places.find((place) => place.id === assignment.place_id) ?? null)
        : null,
    );
    setRole(assignment?.id === -1 ? "" : (assignment?.role ?? ""));
    setNotes(assignment?.id === -1 ? "" : (assignment?.notes ?? ""));
    setAddress(assignment?.id === -1 ? "" : (assignment?.address ?? ""));
    setSortOrder(
      String(assignment?.id === -1 ? 0 : (assignment?.sort_order ?? 0)),
    );
    setPlaceError(null);
  }, [assignment, places]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedPlace) {
      setPlaceError("یک مکان را از فهرست انتخاب کنید.");
      return;
    }

    onSubmit({
      entry_route_id: Number(entryRouteId),
      stay_mode_id: Number(stayModeId),
      place_id: selectedPlace.id,
      role: role.trim(),
      notes: notes.trim() || null,
      address: address.trim() || null,
      sort_order: Number(sortOrder),
    });
  }

  return (
    <Dialog open={assignment !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {assignment?.id === -1
                ? "افزودن تخصیص مکان"
                : "ویرایش تخصیص مکان"}
            </DialogTitle>
            <DialogDescription>
              مکان را انتخاب و اطلاعات تخصیص را تکمیل کنید.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="assignment-entry-route">مسیر ورودی</Label>
            <select
              id="assignment-entry-route"
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              value={entryRouteId}
              onChange={(event) => setEntryRouteId(event.currentTarget.value)}
              required
            >
              <option value="" disabled>
                انتخاب مسیر
              </option>
              {entryRoutes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="assignment-stay-mode">شیوه اقامت</Label>
            <select
              id="assignment-stay-mode"
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              value={stayModeId}
              onChange={(event) => setStayModeId(event.currentTarget.value)}
              required
            >
              <option value="" disabled>
                انتخاب شیوه اقامت
              </option>
              {stayModes.map((stayMode) => (
                <option key={stayMode.id} value={stayMode.id}>
                  {stayMode.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="assignment-place">مکان</Label>
            <Combobox.Root
              items={places}
              value={selectedPlace}
              onValueChange={(place) => {
                setSelectedPlace(place);
                setPlaceError(null);
              }}
              itemToStringLabel={(place) => place?.name ?? ""}
              itemToStringValue={(place) => (place ? String(place.id) : "")}
              isItemEqualToValue={(item, value) => item.id === value.id}
              filter={(place, query) => {
                const search = query.trim().toLocaleLowerCase();
                return (
                  !search ||
                  place.name.toLocaleLowerCase().includes(search) ||
                  (place.description ?? "").toLocaleLowerCase().includes(search)
                );
              }}
              onInputValueChange={(_, eventDetails) => {
                if (
                  eventDetails.reason === "input-change" ||
                  eventDetails.reason === "input-clear"
                ) {
                  setSelectedPlace(null);
                }
              }}
            >
              <Combobox.Input
                id="assignment-place"
                className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                placeholder="نام یا توضیحات مکان را جست‌وجو کنید"
                required
              />
              <Combobox.Portal>
                <Combobox.Positioner
                  className="z-[60] outline-none"
                  sideOffset={4}
                >
                  <Combobox.Popup className="w-[var(--anchor-width)] max-w-[var(--available-width)] rounded-md border bg-popover text-popover-foreground shadow-md">
                    <Combobox.Empty className="px-3 py-2 text-sm text-muted-foreground">
                      مکانی پیدا نشد.
                    </Combobox.Empty>
                    <Combobox.List className="max-h-56 overflow-y-auto p-1">
                      {(place: Place) => (
                        <Combobox.Item
                          key={place.id}
                          value={place}
                          className="cursor-default rounded-sm px-3 py-2 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground"
                        >
                          <div>{place.name}</div>
                          {place.description ? (
                            <div className="text-xs text-muted-foreground">
                              {place.description}
                            </div>
                          ) : null}
                        </Combobox.Item>
                      )}
                    </Combobox.List>
                  </Combobox.Popup>
                </Combobox.Positioner>
              </Combobox.Portal>
            </Combobox.Root>
            {placeError ? (
              <p className="text-sm text-destructive" role="alert">
                {placeError}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="assignment-role">نقش</Label>
            <Input
              id="assignment-role"
              value={role}
              onChange={(event) => setRole(event.currentTarget.value)}
              maxLength={255}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="assignment-address">نشانی</Label>
            <Input
              id="assignment-address"
              value={address}
              onChange={(event) => setAddress(event.currentTarget.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="assignment-notes">یادداشت</Label>
            <textarea
              id="assignment-notes"
              className="min-h-20 w-full rounded-md border border-input bg-input/20 px-2 py-1.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              value={notes}
              onChange={(event) => setNotes(event.currentTarget.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="assignment-sort-order">ترتیب</Label>
            <Input
              id="assignment-sort-order"
              type="number"
              min={0}
              step={1}
              value={sortOrder}
              onChange={(event) => setSortOrder(event.currentTarget.value)}
              required
            />
          </div>

          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}

          <DialogFooter>
            <DialogClose
              render={<Button type="button" variant="outline" />}
              disabled={isPending}
            >
              انصراف
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "در حال ذخیره..." : "ذخیره"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
