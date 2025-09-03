import ChallengeIcon from "@/components/Icon/ChallengeIcon";

type Tab = "pending" | "done";

type IconName =
  | "ball"
  | "book"
  | "broom"
  | "bus"
  | "edit"
  | "water"
  | "music"
  | "alarm";

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  duration: number;
  createdAt: string;
  status: "pending" | "done";
}

interface ChallengeListProps {
  tab: Tab;
  challenges: Challenge[];
}

const ICON_COLORS: Record<IconName, string> = {
  ball: "bg-lime-100",
  book: "bg-pink-100",
  broom: "bg-orange-100",
  bus: "bg-blue-100",
  edit: "bg-yellow-100",
  water: "bg-cyan-100",
  music: "bg-purple-100",
  alarm: "bg-green-100",
};

export default function ChallengeList({ tab, challenges }: ChallengeListProps) {
  if (challenges.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-center text-gray-500 p-5">
        {tab === "pending" ? (
          <div className="flex flex-col items-center">
            <div>아직 인증할 챌린지가 없습니다.</div>
            <div>
              <span className="font-bold text-primary">+ 버튼</span>을 눌러
              새로운 챌린지를 <br />
              등록해 보세요!
            </div>
          </div>
        ) : (
          "챌린지 인증을 완료해 보세요!"
        )}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <ul className="space-y-3 w-full px-5 pb-30">
        {challenges.map((challenge) => (
          <li
            key={challenge.id}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 mx-3 shadow-sm border border-gray-200 ${ICON_COLORS[challenge.icon]}`}
          >
            <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
              <ChallengeIcon name={challenge.icon} variant="black" size={20} />
            </div>
            <span className="text-gray-800 font-medium flex-1">
              {challenge.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
