import { useNavigate } from "react-router-dom";
import ChallengeIcon from "@/components/Icon/ChallengeIcon";
import { type IconName, ICON_LIGHT_COLORS } from "@/types/challenge";
import CircularProgress from "@/components/common/CircularProgress";

type Tab = "pending" | "done";

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  duration: number;
  createdAt: string;
  status: "pending" | "done";
  completedDays?: number; // 완료한 일수 (임시)
  totalDays?: number; // 전체 일수 (임시)
}

interface ChallengeListProps {
  tab: Tab;
  challenges: Challenge[];
  onChallengeToggle?: (challengeId: string) => void;
}

export default function ChallengeList({ tab, challenges }: ChallengeListProps) {
  const navigate = useNavigate();

  // 챌린지 상세 페이지로 이동
  const handleChallengeClick = (
    challengeId: string,
    event: React.MouseEvent
  ) => {
    console.log("챌린지 클릭됨:", challengeId);
    event.stopPropagation();
    navigate(`/challenge/${challengeId}`);
  };

  // 남은 일자 계산 함수
  const getRemainingDays = (challenge: Challenge) => {
    const startDate = new Date(challenge.createdAt);
    const today = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + challenge.duration);

    const timeDiff = endDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff <= 0) return 0;
    return daysDiff;
  };

  // 임시 데이터 생성 함수
  const getProgressData = (challenge: Challenge) => {
    // 임시로 랜덤한 완료 일수 생성 (0 ~ duration 사이)
    const completedDays =
      challenge.completedDays ??
      Math.floor(Math.random() * (challenge.duration + 1));
    const totalDays = challenge.totalDays ?? challenge.duration;
    return { completedDays, totalDays };
  };

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
      <ul className="space-y-3 w-[clamp(320px,calc(100vw-32px),420px)]px-5 pb-30">
        {challenges.map((challenge) => (
          <li
            key={challenge.id}
            className="flex items-center gap-3 rounded-3xl px-4 py-3 mx-3 shadow-sm bg-white cursor-pointer hover:shadow-md transition-shadow"
            onClick={(event) => handleChallengeClick(challenge.id, event)}
          >
            <div
              className={`w-12 h-12 ${ICON_LIGHT_COLORS[challenge.icon]} rounded-2xl flex items-center justify-center shadow-sm`}
            >
              <ChallengeIcon name={challenge.icon} variant="color" size={20} />
            </div>
            <div className="flex-1">
              <div className="text-gray-800 font-medium">{challenge.title}</div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <img
                  src="/images/timer-icon.svg"
                  alt="timer"
                  className="w-3 h-3"
                />
                <span>
                  {getRemainingDays(challenge) > 0
                    ? `${getRemainingDays(challenge)}일`
                    : "챌린지 종료"}
                </span>
              </div>
            </div>
            {/* 원형 진행률 바 */}
            <CircularProgress
              completedDays={getProgressData(challenge).completedDays}
              totalDays={getProgressData(challenge).totalDays}
              iconName={challenge.icon}
              showPercentage={true}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
