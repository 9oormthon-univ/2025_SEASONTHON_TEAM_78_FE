import ChallengeIcon from "@/components/Icon/ChallengeIcon";

type IconName = "ball" | "book" | "broom" | "bus" | "edit" | "water";

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
];

const ICON_COLORS: Record<IconName, string> = {
  ball: "bg-green-100",
  book: "bg-pink-100",
  broom: "bg-orange-100",
  bus: "bg-blue-100",
  edit: "bg-yellow-100",
  water: "bg-cyan-100",
};

export default function IconSelector({
  selectedIcon,
  onIconSelect,
}: IconSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">아이콘 선택</h3>
      <div className="grid grid-cols-3 gap-4">
        {ICON_OPTIONS.map((iconName) => (
          <button
            key={iconName}
            type="button"
            onClick={() => onIconSelect(iconName)}
            className={`
              p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3
              ${
                selectedIcon === iconName
                  ? "border-[var(--color-primary)] shadow-lg scale-105"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-md"
              }
              ${ICON_COLORS[iconName]}
            `}
          >
            <div className="p-2 rounded-full bg-white/80 shadow-sm">
              <ChallengeIcon
                name={iconName}
                variant={selectedIcon === iconName ? "color" : "black"}
              />
            </div>
            <span className="text-xs text-gray-700 capitalize font-medium">
              {iconName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
