"use client";

import { Button } from "@/components/ui/button";
import { clearAuthToken } from "@/lib/auth";
import { EntryRoutes } from "./EntryRoutes";
import { Places } from "./Places";
import { RoutePlaceAssignments } from "./RoutePlaceAssignments";
import { StayModes } from "./StayModes";

export default function AdminPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 sm:p-6">
      <h1 className="flex justify-between items-center">
        <span className="text-2xl">مدیریت</span>

        <Button
          variant={"destructive"}
          onClick={() => {
            clearAuthToken();
            window.location.href = "/admin/login";
          }}
        >
          خروج
        </Button>
      </h1>
      <EntryRoutes />
      <StayModes />
      <Places />
      <RoutePlaceAssignments />
    </main>
  );
}
