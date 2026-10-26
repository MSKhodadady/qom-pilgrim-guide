"use client";

import type { Place, StorePlaceRequest } from "api-sdk/models";
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

type PlaceDialogProps = {
  place: Place | null;
  isPending: boolean;
  error: string | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: StorePlaceRequest) => void;
};

export function PlaceDialog({
  place,
  isPending,
  error,
  onOpenChange,
  onSubmit,
}: PlaceDialogProps) {
  const [name, setName] = useState(place?.name ?? "");
  const [description, setDescription] = useState(place?.description ?? "");

  useEffect(() => {
    setName(place?.name ?? "");
    setDescription(place?.description ?? "");
  }, [place]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      name: name.trim(),
      description: description.trim() || null,
    });
  }

  return (
    <Dialog open={place !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {place?.id === -1 ? "افزودن مکان" : "ویرایش مکان"}
            </DialogTitle>
            <DialogDescription>
              نام و توضیحات مکان را وارد کنید.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="place-name">نام مکان</Label>
            <Input
              id="place-name"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
              maxLength={255}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="place-description">توضیحات</Label>
            <textarea
              id="place-description"
              className="min-h-24 w-full rounded-md border border-input bg-input/20 px-2 py-1.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
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
