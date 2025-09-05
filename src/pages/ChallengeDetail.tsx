import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BackNavBar from "@/components/Navbar/BackNavBar";
import ChallengeIcon from "@/components/Icon/ChallengeIcon";
import CircularProgress from "@/components/common/CircularProgress";
import { type IconName, ICON_LIGHT_COLORS } from "@/types/challenge";
import BoxButtonLarge from "@/components/common/BoxButtonLarge";

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  duration: number;
  createdAt: string;
  status: "pending" | "done";
  completedDays?: number;
  totalDays?: number;
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
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [hasTodayCertification, setHasTodayCertification] = useState(false);

  useEffect(() => {
    if (id) {
      // 로컬 스토리지에서 챌린지 찾기
      const challenges = JSON.parse(localStorage.getItem("challenges") || "[]");
      const foundChallenge = challenges.find((c: Challenge) => c.id === id);
      setChallenge(foundChallenge || null);

      // 해당 챌린지의 인증 데이터 가져오기
      const allCertifications = JSON.parse(
        localStorage.getItem("certifications") || "[]"
      );
      const challengeCertifications = allCertifications.filter(
        (cert: Certification) => cert.challengeId === id
      );
      setCertifications(challengeCertifications);

      // 오늘 인증 여부 확인
      const today = new Date().toDateString();
      const todayCertification = challengeCertifications.find(
        (cert: Certification) => {
          const certDate = new Date(cert.createdAt).toDateString();
          return certDate === today;
        }
      );
      setHasTodayCertification(!!todayCertification);
    }
  }, [id]);

  // 페이지 포커스 시 인증 목록 새로고침
  useEffect(() => {
    const handleFocus = () => {
      if (id) {
        const allCertifications = JSON.parse(
          localStorage.getItem("certifications") || "[]"
        );
        const challengeCertifications = allCertifications.filter(
          (cert: Certification) => cert.challengeId === id
        );
        setCertifications(challengeCertifications);

        // 오늘 인증 여부 확인
        const today = new Date().toDateString();
        const todayCertification = challengeCertifications.find(
          (cert: Certification) => {
            const certDate = new Date(cert.createdAt).toDateString();
            return certDate === today;
          }
        );
        setHasTodayCertification(!!todayCertification);
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [id]);

  const handleDelete = () => {
    if (id && window.confirm("정말로 이 챌린지를 삭제하시겠습니까?")) {
      // 로컬 스토리지에서 챌린지 삭제
      const challenges = JSON.parse(localStorage.getItem("challenges") || "[]");
      const updatedChallenges = challenges.filter(
        (c: Challenge) => c.id !== id
      );
      localStorage.setItem("challenges", JSON.stringify(updatedChallenges));

      // 홈 페이지로 이동
      navigate("/home");
    }
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

  // 진행률 데이터 계산 함수 (ChallengeList와 동일한 로직)
  const getProgressData = (challenge: Challenge) => {
    // 임시로 랜덤한 완료 일수 생성 (0 ~ duration 사이)
    const completedDays =
      challenge.completedDays ??
      Math.floor(Math.random() * (challenge.duration + 1));
    const totalDays = challenge.totalDays ?? challenge.duration;
    return { completedDays, totalDays };
  };

  if (!challenge) {
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
        onActionClick={handleDelete}
      />
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* 챌린지 헤더 */}
          <div className="flex flex-row items-start justify-start gap-4">
            <div
              className={`w-20 h-20 ${ICON_LIGHT_COLORS[challenge.icon]} 
              rounded-3xl flex items-center justify-center`}
            >
              <ChallengeIcon name={challenge.icon} variant="color" size={32} />
            </div>
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-xl font-bold mb-2">{challenge.title}</h1>
              <p className="max-w-[280px] text-sm text-gray-800 leading-5">
                {challenge.description}
              </p>
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
                  iconName={challenge.icon}
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
          {hasTodayCertification ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-green-800 font-semibold text-lg">
                  오늘의 인증을 완료했어요!
                </span>
              </div>
              <p className="text-green-600 text-sm">내일 다시 도전해보세요</p>
            </div>
          ) : (
            <BoxButtonLarge onClick={() => navigate(`/challenge/${id}/today`)}>
              오늘의 인증 추가하기
            </BoxButtonLarge>
          )}
        </div>
      </div>
    </div>
  );
}
