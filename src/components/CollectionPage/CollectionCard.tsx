import ChallengeIcon from "@/components/Icon/ChallengeIcon";

interface CollectionCardProps {
  icon: "ball" | "book" | "broom" | "bus" | "edit" | "water";
  title: string;
  endDate: string;
  onClick?: () => void;
}

function CollectionCard({
  icon,
  title,
  endDate,
  onClick,
}: CollectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center w-full aspect-square gap-1.5 rounded-[20px] bg-[#f4f7fb] px-2 py-[clamp(1px,4.2vw,3px)] cursor-pointer focus:outline-none"
    >
      <ChallengeIcon
        name={icon}
        variant="color"
        size={24}
        alt={`${icon} icon`}
      />

      <p className="w-[85%] text-sm font-bold text-center text-black break-words whitespace-normal">
        {title}
      </p>

      <p className="text-xs font-medium text-[#93979d]">{endDate}</p>
    </button>
  );
}

export default CollectionCard;
