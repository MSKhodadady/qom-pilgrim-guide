import {
  BedDoubleIcon,
  Bus01Icon,
  ParkingAreaSquareIcon,
  TentIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ReactNode } from "react";

export const placeAssignmentTypes: Record<
  string,
  { per: string; icon: ReactNode }
> = {
  parking: {
    per: "پارکینگ",
    icon: <HugeiconsIcon icon={ParkingAreaSquareIcon} />,
  },
  lodging: {
    per: "اقامتگاه",
    icon: <HugeiconsIcon icon={TentIcon} />,
  },
  transport: {
    per: "ایستگاه",
    icon: <HugeiconsIcon icon={Bus01Icon} />,
  },
  hotel: {
    per: "هتل",
    icon: <HugeiconsIcon icon={BedDoubleIcon} />,
  },
};
