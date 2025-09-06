import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "@/components/Navbar/BackNavBar";
import BottomNavBar from "@/components/Navbar/BottomNavBar";
import ChallengeIcon, { type IconName } from "@/components/Icon/ChallengeIcon";
import { ICON_LIGHT_COLORS } from "@/components/Icon/challenge-color";
import CircularProgress from "@/components/common/CircularProgress";
import {
  getActiveChallenge,
  type ActiveChallenge,
} from "@/lib/api/activeChallenge";

type LoadState = "idle" | "loading" | "done" | "error";

function ActiveChallengePage() {
  const navigate = useNavigate();
  const [state, setState] = useState<LoadState>("idle");
  const [challenge, setChallenge] = useState<ActiveChallenge | null>(null);

  useEffect(() => {
    (async () => {
      setState("loading");
      try {
        const data = await getActiveChallenge();
        setChallenge(data);
        setState("done");
      } catch {
        setState("error");
      }
    })();
  }, []);

  const iconName = useMemo<IconName | null>(() => {
    if (!challenge) return null;
    return challenge.challengeIcon as IconName;
  }, [challenge]);

  const handleGoDetail = () => {
    if (!challenge) return;
    navigate(`/challenge/${challenge.id}`);
  };

  return (
    <>
      <BackHeader title="진행중인 챌린지" />

      <main className="mx-auto w-full max-w-[480px] px-4 py-6">
        {state === "loading" && (
          <div className="flex h-40 items-center justify-center text-gray-600">
            불러오는 중...
          </div>
        )}

        {state === "error" && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
            진행중인 챌린지를 불러오지 못했어요.
          </div>
        )}

        {state === "done" && !challenge && (
          <div className="rounded-2xl bg-white p-6 text-center ">
            진행중인 챌린지가 없습니다.
          </div>
        )}

        {state === "done" && challenge && iconName && (
          <button
            type="button"
            onClick={handleGoDetail}
            className="flex w-full items-center gap-4 rounded-3xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${ICON_LIGHT_COLORS[iconName]}`}
            >
              <ChallengeIcon name={iconName} variant="color" size={24} />
            </div>

            <div className="flex-1">
              <div className="mb-1 line-clamp-1 text-base font-semibold text-gray-900">
                {challenge.title}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <img src="/images/timer-icon.svg" alt="" className="h-3 w-3" />
                <span>남은 {challenge.remainingDays}일</span>
              </div>
            </div>

            <CircularProgress
              completedDays={challenge.achievementRate}
              totalDays={100}
              iconName={iconName}
              showPercentage={true}
            />
          </button>
        )}
      </main>

      <BottomNavBar />
    </>
  );
}

export default ActiveChallengePage;
