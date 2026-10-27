"use client";

import type { StayMode, StoreStayModeRequest } from "api-sdk/models";
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

type StayModeDialogProps = {
  stayMode: StayMode | null;
  isPending: boolean;
  error: string | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: StoreStayModeRequest) => void;
};

export function StayModeDialog({
  stayMode,
  isPending,
  error,
  onOpenChange,
  onSubmit,
}: StayModeDialogProps) {
  const [name, setName] = useState(stayMode?.name ?? "");
  const [slug, setSlug] = useState(stayMode?.slug ?? "");

  useEffect(() => {
    setName(stayMode?.name ?? "");
    setSlug(stayMode?.slug ?? "");
  }, [stayMode]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ name: name.trim(), slug: slug.trim() });
  }

  return (
    <Dialog open={stayMode !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {stayMode?.id === -1 ? "افزودن شیوه اقامت" : "ویرایش شیوه اقامت"}
            </DialogTitle>
            <DialogDescription>
              نام و شناسه شیوه اقامت را وارد کنید.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="stay-mode-name">نام</Label>
            <Input
              id="stay-mode-name"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
              maxLength={255}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="stay-mode-slug">شناسه (Slug)</Label>
            <Input
              id="stay-mode-slug"
              dir="ltr"
              value={slug}
              onChange={(event) => setSlug(event.currentTarget.value)}
              maxLength={255}
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
