import ChallengeIcon from "@/components/Icon/ChallengeIcon";
import { type IconName, ICON_LIGHT_COLORS } from "@/types/challenge";

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
              ${ICON_LIGHT_COLORS[iconName]}
            `}
          >
            <ChallengeIcon name={iconName} variant="color" size={32} />
          </button>
        ))}
      </div>
    </div>
  );
}
