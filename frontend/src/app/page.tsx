import { entryRoutesIndex, stayModesIndex } from "api-sdk/api-with-base";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";

export default async function MainPage(P: {
  searchParams: Promise<{ entry: string | string[] | undefined }>;
}) {
  const entryRoutesReq = await entryRoutesIndex();
  const stayModeReq = await stayModesIndex();

  if (entryRoutesReq.status != 200 || stayModeReq.status != 200)
    throw new Error("entry-points-fetch-err");

  const entryRoutes = entryRoutesReq.data.data;
  const stayModes = stayModeReq.data.data;

  const { entry } = await P.searchParams;

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      {entry == undefined ? (
        <>
          <h3 className="text-xl">
            زائر عزیز، لطفا از میان گزینه‌های زیر، انتخاب کنید که از کدام سمت
            وارد شهر مقدس قم شده اید:
          </h3>
          {entryRoutes.map((i) => (
            <Item variant="outline" key={i.id}>
              <ItemContent>
                <ItemTitle className="text-lg">{i.name}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <Link href={`/?entry=${i.slug}`}>
                  <Button variant="default" size="lg" className="text-lg">
                    انتخاب
                  </Button>
                </Link>
              </ItemActions>
            </Item>
          ))}
        </>
      ) : (
        <>
          <h3 className="flex justify-between items-center text-xl">
            <span>لطفا نحوه اقامت خود را وارد نمایید:</span>

            <Link href={"/"}>
              <Button className={"text-lg"} variant={"outline"}>
                برگشت
              </Button>
            </Link>
          </h3>
          {stayModes.map((i) => (
            <Item variant="outline" key={i.id}>
              <ItemContent>
                <ItemTitle className="text-lg">{i.name}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <Link href={`/${entry}/${i.slug}`}>
                  <Button size="lg" className="text-lg">
                    انتخاب
                  </Button>
                </Link>
              </ItemActions>
            </Item>
          ))}
        </>
      )}
    </div>
  );
}
