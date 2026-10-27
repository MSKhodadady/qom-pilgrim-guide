import { routePlaceAssignmentsIndex } from "api-sdk/api-with-base";
import type {
  EntryRoute,
  Place,
  RoutePlaceAssignment,
  StayMode,
} from "api-sdk/models";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { placeAssignmentTypes } from "@/lib/placeAssignmentTypes";

type RoutePlaceAssignmentFull = RoutePlaceAssignment & {
  entry_route: EntryRoute;
  stay_mode: StayMode;
  place: Place;
};

export default async function EntryRoutePage(P: {
  params: Promise<{ entry: string; stay: string }>;
}) {
  const { entry, stay } = await P.params;

  const req = await routePlaceAssignmentsIndex({
    entry_route: entry,
    stay_mode: stay,
  });

  if (req.status != 200) throw new Error("entry-points-fetch-err");

  const data = req.data.data as RoutePlaceAssignmentFull[];

  const roleGrouped = Object.entries(
    data.reduce(
      (acc, i) => {
        if (acc[i.role]) acc[i.role].push(i);
        else acc[i.role] = [i];

        return acc;
      },
      {} as Record<string, RoutePlaceAssignmentFull[]>,
    ),
  ).map<[string, RoutePlaceAssignmentFull[]]>(([k, v]) => [
    placeAssignmentTypes[k]?.per ?? k,
    v,
  ]);

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <h1 className="flex justify-between items-center border rounded-xl border-slate-300 p-4 w-full text-xl">
        <span>لیست محل های مرتبط</span>

        <Link href={"/"}>
          <Button className={"text-lg"} variant={"outline"}>
            برگشت
          </Button>
        </Link>
      </h1>
      {roleGrouped.map(([k, v]) => (
        <div
          key={k}
          className="w-full max-w-2xl flex flex-col gap-3 items-center"
        >
          <h1 className="w-full text-start font-bold text-xl">{k}</h1>

          {v.map((i) => (
            <Item variant="outline" key={i.id} className="w-full">
              <ItemContent>
                <ItemTitle className="text-lg">{i.place.name}</ItemTitle>
                {i.address && (
                  <ItemDescription className="text-lg">
                    {i.address}
                  </ItemDescription>
                )}
              </ItemContent>
              {/* <ItemActions>
                  <Link href={`/?entry=${i.slug}`}>
                    <Button variant="outline" size="lg">
                      انتخاب
                    </Button>
                  </Link>
                </ItemActions> */}
            </Item>
          ))}
        </div>
      ))}
    </div>
  );
}
