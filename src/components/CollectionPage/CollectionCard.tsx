import ChallengeIcon from "@/components/Icon/ChallengeIcon";

interface CollectionCardProps {
  icon: "ball" | "book" | "broom" | "bus" | "edit" | "water";
  title: string;
  endDate: string;
}

function CollectionCard({ icon, title, endDate }: CollectionCardProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full aspect-square gap-1.5 rounded-[20px] bg-[#f4f7fb] px-2 py-[clamp(1px,4.2vw,3px)]">
      <ChallengeIcon name={icon} variant="color" alt={`${icon} icon`} />

      <p className="w-[85%] text-sm font-bold text-center text-black break-words whitespace-normal">
        {title}
      </p>

      <p className="text-xs font-medium text-[#93979d]">{endDate}</p>
    </div>
  );
}

export default CollectionCard;
