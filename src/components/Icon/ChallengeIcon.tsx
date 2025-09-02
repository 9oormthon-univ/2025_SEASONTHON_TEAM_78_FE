import BallBlack from "@/assets/ball-black.svg";
import BallColor from "@/assets/ball-color.svg";
import BookBlack from "@/assets/book-black.svg";
import BookColor from "@/assets/book-color.svg";
import BroomBlack from "@/assets/broom-black.svg";
import BroomColor from "@/assets/broom-color.svg";
import BusBlack from "@/assets/bus-black.svg";
import BusColor from "@/assets/bus-color.svg";
import EditBlack from "@/assets/edit-black.svg";
import EditColor from "@/assets/edit-color.svg";
import WaterBlack from "@/assets/water-black.svg";
import WaterColor from "@/assets/water-color.svg";

type IconName = "ball" | "book" | "broom" | "bus" | "edit" | "water";
type IconVariant = "black" | "color";

const ICONS: Record<IconName, Record<IconVariant, string>> = {
  ball: { black: BallBlack, color: BallColor },
  book: { black: BookBlack, color: BookColor },
  broom: { black: BroomBlack, color: BroomColor },
  bus: { black: BusBlack, color: BusColor },
  edit: { black: EditBlack, color: EditColor },
  water: { black: WaterBlack, color: WaterColor },
};

interface ChallengeIconProps {
  name: IconName;
  variant?: IconVariant;
  alt?: string;
  size?: number;
}

function ChallengeIcon({
  name,
  variant = "black",
  alt = "",
  size = 24, //기본 사이즈
}: ChallengeIconProps) {
  const src = ICONS[name][variant];

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
    />
  );
}

export default ChallengeIcon;
