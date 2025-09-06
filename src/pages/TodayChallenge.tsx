import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import BackNavBar from "@/components/Navbar/BackNavBar";
import TodayChallengeForm from "@/components/features/today-challenge/TodayChallengeForm";
import { getChallengeDetail } from "@/lib/api/challenges";

interface Certification {
  id: string;
  challengeId: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}

export default function TodayChallenge() {
  const { id, certificationId } = useParams<{
    id: string;
    certificationId?: string;
  }>();
  const navigate = useNavigate();
  const [certification, setCertification] = useState<Certification | null>(
    null
  );

  // 챌린지 상세 정보 조회
  const {
    data: challenge,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["challengeDetail", id],
    queryFn: () => getChallengeDetail(id!),
    enabled: !!id,
  });

  // 인증 데이터는 임시로 null로 설정 (나중에 API 연결)
  useEffect(() => {
    setCertification(null);
  }, [certificationId]);

  const handleSuccess = () => {
    navigate(`/challenge/${id}`);
  };

  const isEditMode = !!certificationId;

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen">
        <BackNavBar title={isEditMode ? "인증 수정" : "오늘의 인증"} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-lg font-medium">
              챌린지 정보를 불러오는 중...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !challenge) {
    return (
      <div className="flex flex-col h-screen">
        <BackNavBar title={isEditMode ? "인증 수정" : "오늘의 인증"} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-lg font-medium">챌린지를 찾을 수 없습니다</div>
            <div className="text-sm mt-2">잘못된 접근입니다.</div>
          </div>
        </div>
      </div>
    );
  }

  const convertedChallenge =
    challenge && challenge.title
      ? {
          id: id || "unknown",
          title: challenge.title,
          description: challenge.content || "",
          icon: challenge.challengeIcon,
          duration: challenge.totalChallengeDays || challenge.remainingDays,
          createdAt: new Date().toISOString(),
          status: "pending" as const,
          completedDays: Math.round(
            (challenge.achievementRate / 100) *
              (challenge.totalChallengeDays || challenge.remainingDays)
          ),
          totalDays: challenge.totalChallengeDays || challenge.remainingDays,
        }
      : null;

  return (
    <div className="flex flex-col h-screen">
      <BackNavBar title={isEditMode ? "인증 수정" : "오늘의 인증"} />
      <TodayChallengeForm
        challengeId={id || ""}
        challenge={convertedChallenge}
        certification={certification}
        mode={isEditMode ? "edit" : "create"}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
