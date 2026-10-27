import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl pt-12 w-full flex flex-col items-center gap-6 p-1">
      <Spinner />
    </main>
  );
}
