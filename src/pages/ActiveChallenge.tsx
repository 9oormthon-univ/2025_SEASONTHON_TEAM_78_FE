import { useEffect, useState } from "react";
import BackHeader from "@/components/Navbar/BackNavBar";
import BottomNavBar from "@/components/Navbar/BottomNavBar";
import ChallengeIcon, { type IconName } from "@/components/Icon/ChallengeIcon";
import { ICON_LIGHT_COLORS } from "@/components/Icon/challenge-color";
import CircularProgress from "@/components/common/CircularProgress";
import {
  getActiveChallenges,
  type ActiveChallenge,
} from "@/lib/api/activeChallenge";

type LoadState = "idle" | "loading" | "done" | "error";

function ActiveChallengePage() {
  const [state, setState] = useState<LoadState>("idle");
  const [list, setList] = useState<ActiveChallenge[]>([]);

  useEffect(() => {
    (async () => {
      setState("loading");
      try {
        const data = await getActiveChallenges();
        setList(data);
        setState("done");
      } catch {
        setState("error");
      }
    })();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <BackHeader title="진행중인 챌린지" />

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {state === "loading" && (
            <div className="h-40 flex items-center justify-center text-center text-gray-500 p-5">
              불러오는 중...
            </div>
          )}

          {state === "error" && (
            <div className="mx-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
              진행중인 챌린지를 불러오지 못했어요.
            </div>
          )}

          {state === "done" && list.length === 0 && (
            <div className="mx-5 rounded-2xl bg-white p-6 text-center">
              진행중인 챌린지가 없습니다.
            </div>
          )}

          {state === "done" && list.length > 0 && (
            <ul className="space-y-3 px-2 pb-2">
              {list.map((c) => {
                const iconName = c.challengeIcon as IconName;
                return (
                  <li
                    key={c.id}
                    className="flex items-center gap-3 rounded-3xl px-4 py-3 mx-3 shadow-sm bg-white transition-shadow"
                  >
                    <div
                      className={`w-12 h-12 ${ICON_LIGHT_COLORS[iconName]} rounded-2xl flex items-center justify-center shadow-sm`}
                    >
                      <ChallengeIcon
                        name={iconName}
                        variant="color"
                        size={20}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="text-gray-800 font-medium flex items-center gap-2">
                        {c.title}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <img
                          src="/images/timer-icon.svg"
                          alt="timer"
                          className="w-3 h-3"
                        />
                        <span>남은 {c.remainingDays}일</span>
                      </div>
                    </div>

                    <CircularProgress
                      completedDays={c.achievementRate}
                      totalDays={100}
                      iconName={iconName}
                      showPercentage={true}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
}

export default ActiveChallengePage;
