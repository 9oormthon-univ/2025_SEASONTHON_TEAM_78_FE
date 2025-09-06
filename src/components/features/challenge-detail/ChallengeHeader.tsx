import ChallengeIcon from "@/components/Icon/ChallengeIcon";
import {
  type IconName,
  ICON_LIGHT_COLORS,
} from "@/components/Icon/challenge-color";
import type { ChallengeDetailResponse } from "@/types/challenge";

type ChallengeData = ChallengeDetailResponse["data"];

interface ChallengeHeaderProps {
  challenge: ChallengeData;
}

export default function ChallengeHeader({ challenge }: ChallengeHeaderProps) {
  return (
    <div className="flex flex-row items-start justify-start gap-4">
      <div
        className={`w-20 h-20 ${ICON_LIGHT_COLORS[challenge.challengeIcon as IconName]} 
        rounded-3xl flex items-center justify-center`}
      >
        <ChallengeIcon
          name={challenge.challengeIcon as IconName}
          variant="color"
          size={32}
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-xl font-bold mb-2">{challenge.title}</h1>
      </div>
    </div>
  );
}
