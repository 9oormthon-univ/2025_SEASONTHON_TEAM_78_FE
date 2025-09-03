import ChallengeIcon from "@/components/Icon/ChallengeIcon";

type IconName =
  | "ball"
  | "book"
  | "broom"
  | "bus"
  | "edit"
  | "water"
  | "music"
  | "alarm";

interface IconSelectorProps {
  selectedIcon: IconName | null;
  onIconSelect: (icon: IconName) => void;
}

const ICON_OPTIONS: IconName[] = [
  "ball",
  "book",
  "broom",
  "bus",
  "edit",
  "water",
  "music",
  "alarm",
];

const ICON_COLORS: Record<IconName, string> = {
  book: "bg-pink-300",
  edit: "bg-yellow-300",
  bus: "bg-blue-300",
  alarm: "bg-green-300",
  broom: "bg-orange-300",
  ball: "bg-lime-300",
  water: "bg-cyan-300",
  music: "bg-purple-300",
};

export default function IconSelector({
  selectedIcon,
  onIconSelect,
}: IconSelectorProps) {
  return (
    <div className="space-y-4">
      <label className="block font-semibold mb-2">아이콘 선택</label>
      <div className="grid grid-cols-4 gap-3 justify-items-center">
        {ICON_OPTIONS.map((iconName) => (
          <button
            key={iconName}
            type="button"
            onClick={() => onIconSelect(iconName)}
            className={`
              h-16 w-16 rounded-2xl flex flex-col items-center justify-center
              ${
                selectedIcon === iconName
                  ? "border-2 border-[var(--color-primary)] shadow-lg"
                  : "hover:shadow-md"
              }
              ${ICON_COLORS[iconName]}
            `}
          >
            <ChallengeIcon name={iconName} variant="black" size={32} />
          </button>
        ))}
      </div>
    </div>
  );
}
