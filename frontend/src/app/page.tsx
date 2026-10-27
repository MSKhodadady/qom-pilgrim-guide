import { entryRoutesIndex } from "api-sdk/api-with-base";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";

export default async function MainPage() {
  const entryRoutes = await entryRoutesIndex();

  if (entryRoutes.status != 200) throw new Error("entry-points-fetch-err");

  const d = entryRoutes.data.data;

  return (
    <main className="mx-auto max-w-6xl pt-12 w-full flex flex-col items-center gap-6 p-1">
      <h1 className="flex justify-between items-center border rounded-xl border-slate-300 p-4 w-full">
        <span>شهرداری قم</span>
        <span>سامانه راهنمایی زائر</span>
      </h1>

      <h3>
        زائر عزیز، لطفا از میان گزینه‌های زیر، انتخاب کنید که از کدام سمت وارد
        شهر مقدس قم شده اید:
      </h3>
      <div className="flex w-full max-w-md flex-col gap-6">
        {d.map((i) => (
          <Item variant="outline" key={i.id}>
            <ItemContent>
              <ItemTitle>{i.name}</ItemTitle>
              {/* <ItemDescription>
                A simple item with title and description.
              </ItemDescription> */}
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="lg">
                انتخاب
              </Button>
            </ItemActions>
          </Item>
        ))}
      </div>
    </main>
  );
}
