import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import BackNavBar from "@/components/Navbar/BackNavBar";
import ChallengeIcon from "@/components/Icon/ChallengeIcon";
import CircularProgress from "@/components/common/CircularProgress";
import FormConfirmModal from "@/components/common/FormConfirmModal";
import {
  type IconName,
  ICON_LIGHT_COLORS,
} from "@/components/Icon/challenge-color";
import BoxButtonLarge from "@/components/common/BoxButtonLarge";
import { getChallengeDetail } from "@/lib/api/challenges";

interface Challenge {
  title: string;
  content: string;
  challengeIcon: string;
  remainingDays: number;
  achievementRate: number;
  certificationCount: number;
  certifications: any[];
  status: string;
  totalChallengeDays: number;
}

interface Certification {
  id: string;
  challengeId: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}

export default function ChallengeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [hasTodayCertification, setHasTodayCertification] = useState(false);
  const [showStopModal, setShowStopModal] = useState(false);
  const [isStopping, setIsStopping] = useState(false);

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

  // 인증 데이터는 임시로 빈 배열로 설정 (나중에 API 연결)
  useEffect(() => {
    setCertifications([]);
    setHasTodayCertification(false);
  }, [id]);

  const handleStopClick = () => {
    setShowStopModal(true);
  };

  const handleStop = async () => {
    if (!id) return;

    setIsStopping(true);
    try {
      // TODO: 챌린지 중단 API 호출
      console.log("챌린지 중단 요청:", id);

      setShowStopModal(false);
      // 홈 페이지로 이동
      navigate("/home");
    } catch (error) {
      console.error("챌린지 중단 중 오류가 발생했습니다:", error);
      alert("챌린지 중단 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsStopping(false);
    }
  };

  // 남은 일자 계산 함수 (API에서 직접 받아옴)
  const getRemainingDays = (challenge: Challenge) => {
    return challenge.remainingDays;
  };

  // 진행률 데이터 계산 함수 (API 데이터 사용)
  const getProgressData = (challenge: Challenge) => {
    const totalDays = challenge.totalChallengeDays || challenge.remainingDays;
    const completedDays = Math.round(
      (challenge.achievementRate / 100) * totalDays
    );
    return { completedDays, totalDays };
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen">
        <BackNavBar title="챌린지 상세" />
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
        <BackNavBar title="챌린지 상세" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-lg font-medium">챌린지를 찾을 수 없습니다</div>
            <div className="text-sm mt-2">잘못된 접근입니다.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <BackNavBar
        title="챌린지 상세"
        icon={
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        }
        onActionClick={handleStopClick}
      />
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* 챌린지 헤더 */}
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

          <div className="grid grid-cols-2 items-start justify-center gap-4">
            {/* 챌린지 남은기간 */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="mb-4 text-sm  font-medium">남은 기간</p>
              <div className="flex items-center gap-2 text-xl font-semibold">
                <img
                  src="/images/timer-black-icon.webp"
                  alt="timer"
                  className="w-6 h-6"
                />
                <span>
                  {getRemainingDays(challenge) > 0 ? (
                    <>
                      {getRemainingDays(challenge)}
                      <span className="text-base font-normal text-gray-700">
                        일
                      </span>
                    </>
                  ) : (
                    "챌린지 종료"
                  )}
                </span>
              </div>
            </div>

            {/* 챌린지 달성률 */}
            <div className="flex flex-row justify-between bg-gray-50 rounded-2xl p-4">
              <div className="flex flex-col">
                <p className="mb-4 text-sm font-medium">달성률</p>
                <div className="text-xl font-bold text-gray-800">
                  {Math.round(
                    (getProgressData(challenge).completedDays /
                      getProgressData(challenge).totalDays) *
                      100
                  )}
                  <span className="text-base font-normal text-gray-700">%</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <CircularProgress
                  completedDays={getProgressData(challenge).completedDays}
                  totalDays={getProgressData(challenge).totalDays}
                  iconName={challenge.challengeIcon as IconName}
                  size={60}
                  strokeWidth={10}
                  showPercentage={false}
                />
              </div>
            </div>
          </div>

          {/* 인증 목록 */}
          {certifications.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">인증 목록</h3>
              <div className="space-y-3">
                {certifications
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((certification) => (
                    <div
                      key={certification.id}
                      className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        {certification.image && (
                          <img
                            src={certification.image}
                            alt="인증 사진"
                            className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 mb-1">
                            {certification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {certification.content}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {new Date(
                                certification.createdAt
                              ).toLocaleDateString()}
                            </span>
                            <button
                              onClick={() =>
                                navigate(
                                  `/challenge/${id}/today/${certification.id}`
                                )
                              }
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                            >
                              수정
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 챌린지 인증 버튼 */}
          {false ? (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                  />
                </svg>
                <span className="text-gray-800 font-semibold text-lg">
                  챌린지가 중단되었습니다
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                중단된 챌린지는 더 이상 인증할 수 없습니다
              </p>
            </div>
          ) : (
            <BoxButtonLarge
              onClick={
                hasTodayCertification
                  ? undefined
                  : () => navigate(`/challenge/${id}/today`)
              }
              disabled={hasTodayCertification}
            >
              {hasTodayCertification
                ? "오늘의 인증을 마쳤어요!"
                : "오늘의 인증 추가하기"}
            </BoxButtonLarge>
          )}
        </div>
      </div>

      {/* 챌린지 중단 확인 모달 */}
      <FormConfirmModal
        isOpen={showStopModal}
        onClose={() => setShowStopModal(false)}
        onConfirm={handleStop}
        variant="custom"
        title="챌린지"
        message={`정말로 이 챌린지를 중단하시겠습니까?
                  중단된 챌린지는 더 이상 인증할 수 없지만,
                  기존 인증 데이터는 그대로 보존됩니다.`}
        confirmText="중단"
        cancelText="취소"
        isLoading={isStopping}
        confirmButtonColor="red"
      />
    </div>
  );
}
