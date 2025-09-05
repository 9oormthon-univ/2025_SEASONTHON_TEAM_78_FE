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
import MusicBlack from "@/assets/music-black.svg";
import MusicColor from "@/assets/music-color.svg";
import AlarmBlack from "@/assets/alarm-black.svg";
import AlarmColor from "@/assets/alarm-color.svg";
import BoxBlack from "@/assets/box-black.svg";
import BoxColor from "@/assets/box-color.svg";
import CookBlack from "@/assets/cook-black.svg";
import CookColor from "@/assets/cook-color.svg";
import MoonBlack from "@/assets/moon-black.svg";
import MoonColor from "@/assets/moon-color.svg";
import RunBlack from "@/assets/run-black.svg";
import RunColor from "@/assets/run-color.svg";

export type IconName =
  | "ball"
  | "book"
  | "broom"
  | "bus"
  | "edit"
  | "water"
  | "music"
  | "alarm"
  | "box"
  | "cook"
  | "moon"
  | "run";
type IconVariant = "black" | "color";

const ICONS: Record<IconName, Record<IconVariant, string>> = {
  ball: { black: BallBlack, color: BallColor },
  book: { black: BookBlack, color: BookColor },
  broom: { black: BroomBlack, color: BroomColor },
  bus: { black: BusBlack, color: BusColor },
  edit: { black: EditBlack, color: EditColor },
  water: { black: WaterBlack, color: WaterColor },
  music: { black: MusicBlack, color: MusicColor },
  alarm: { black: AlarmBlack, color: AlarmColor },
  box: { black: BoxBlack, color: BoxColor },
  cook: { black: CookBlack, color: CookColor },
  moon: { black: MoonBlack, color: MoonColor },
  run: { black: RunBlack, color: RunColor },
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
