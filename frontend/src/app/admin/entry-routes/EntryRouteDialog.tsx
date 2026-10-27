"use client";

import type { EntryRoute, StoreEntryRouteRequest } from "api-sdk/models";
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

type EntryRouteDialogProps = {
  open: EntryRoute | null;
  isPending: boolean;
  error: string | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: StoreEntryRouteRequest) => void;
};

export function EntryRouteDialog({
  open: route,
  isPending,
  error,
  onOpenChange,
  onSubmit,
}: EntryRouteDialogProps) {
  const [name, setName] = useState(route?.name ?? "");
  const [slug, setSlug] = useState(route?.slug ?? "");
  const [sortOrder, setSortOrder] = useState(String(route?.sort_order ?? "0"));

  useEffect(() => {
    if (route != null) {
      setName(route?.name ?? "");
      setSlug(route?.slug ?? "");
      setSortOrder(String(route?.sort_order ?? 0));
    }
  }, [route]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      name: name.trim(),
      slug: slug.trim(),
      sort_order: Number(sortOrder),
    });
  }

  return (
    <Dialog open={route != null} onOpenChange={onOpenChange}>
      <DialogContent>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {route ? "ویرایش مسیر ورودی" : "افزودن مسیر ورودی"}
            </DialogTitle>
            <DialogDescription>
              اطلاعات مسیر ورودی را وارد کنید.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="entry-route-name">نام</Label>
            <Input
              id="entry-route-name"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
              maxLength={255}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="entry-route-slug">شناسه (Slug)</Label>
            <Input
              id="entry-route-slug"
              dir="ltr"
              value={slug}
              onChange={(event) => setSlug(event.currentTarget.value)}
              maxLength={255}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="entry-route-sort-order">ترتیب نمایش</Label>
            <Input
              id="entry-route-sort-order"
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
