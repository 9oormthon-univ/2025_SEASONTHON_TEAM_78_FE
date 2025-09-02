type Tab = "pending" | "done";

interface Challenge {
  id: string;
  title: string;
}

interface ChallengeListProps {
  tab: Tab;
  challenges: Challenge[];
}

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
      <ul className="space-y-3 w-full px-5 pb-20">
        {challenges.map((challenge) => (
          <li
            key={challenge.id}
            className="flex items-center justify-between rounded-lg bg-white px-4 py-3 mx-3 shadow-sm border border-gray-500"
          >
            <span className="text-gray-800 font-medium">{challenge.title}</span>
            {tab === "pending" ? (
              <button
                type="button"
                className="rounded-full bg-gradient-to-b from-[#4672FF] to-[#8DB7FF] px-3 py-1 text-white text-xs font-semibold shadow hover:from-[#2B5BFF] hover:to-[#6B9FFF]"
              >
                인증하기
              </button>
            ) : (
              <span className="text-xs text-gray-500">완료</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
