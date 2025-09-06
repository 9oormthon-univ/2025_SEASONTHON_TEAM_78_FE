import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import BoxButtonLarge from "@/components/common/BoxButtonLarge";
import Toast from "@/components/common/Toast";
import FormConfirmModal from "@/components/common/FormConfirmModal";
import { createCertification } from "@/lib/api/certifications";
import type { Challenge, Certification } from "@/types/today-challenge";

interface TodayChallengeFormProps {
  challengeId: string;
  challenge: Challenge | null;
  certification?: Certification | null; // 수정할 인증 데이터
  mode: "create" | "edit"; // 생성 또는 수정 모드
  onSuccess?: () => void; // 성공 시 콜백
}

export default function TodayChallengeForm({
  challengeId,
  challenge,
  certification,
  mode,
  onSuccess,
}: TodayChallengeFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasTodayCertification, setHasTodayCertification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 수정 모드일 때 기존 데이터로 초기화
  useEffect(() => {
    if (mode === "edit" && certification) {
      setTitle(certification.title);
      setContent(certification.content);
      setImagePreview(certification.image);
    }
  }, [mode, certification]);

  // 오늘 인증 여부 확인 (생성 모드에서만) - API에서 확인하도록 변경 예정
  useEffect(() => {
    if (mode === "create" && challengeId) {
      // TODO: API에서 오늘 인증 여부 확인
      setHasTodayCertification(false);
    }
  }, [mode, challengeId]);

  // 작성 중인 내용이 있는지 확인
  const hasContent =
    title.trim().length > 0 ||
    content.trim().length > 0 ||
    imagePreview.length > 0;

  // 뒤로가기 이벤트 감지
  useEffect(() => {
    const handlePopState = () => {
      if (hasContent) {
        setShowConfirmModal(true);
        // 뒤로가기 방지를 위해 현재 페이지를 히스토리에 다시 추가
        setTimeout(() => {
          window.history.pushState(
            { preventBack: true },
            "",
            window.location.href
          );
        }, 0);
      }
    };

    window.addEventListener("popstate", handlePopState);

    // 작성 중인 내용이 있을 때만 히스토리에 상태 추가
    if (hasContent) {
      window.history.pushState({ preventBack: true }, "", window.location.href);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasContent]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 모달 핸들러
  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
    navigate(`/challenge/${challengeId}`);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  // 폼 유효성 검사
  const isFormValid =
    title.trim().length > 0 && content.trim().length > 0 && imageFile !== null;

  const handleSubmit = async () => {
    if (!isFormValid || !imageFile) {
      return;
    }

    setIsSubmitting(true);
    try {
      // API 호출
      const response = await createCertification(challengeId, imageFile, {
        title: title.trim(),
        content: content.trim(),
      });

      // 관련 쿼리 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["challengeDetail"] });
      queryClient.invalidateQueries({ queryKey: ["notCertifiedChallenges"] });
      queryClient.invalidateQueries({ queryKey: ["certifiedChallenges"] });

      setShowToast(true);

      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          navigate(`/challenge/${challengeId}`);
        }
      }, 2000);
    } catch (error) {
      console.error("인증 등록 오류:", error);
      alert("인증 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!challenge) {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-lg font-medium">챌린지를 찾을 수 없습니다</div>
            <div className="text-sm mt-2">잘못된 접근입니다.</div>
          </div>
        </div>
      </div>
    );
  }

  // 이미 오늘 인증했을 때
  if (mode === "create" && hasTodayCertification) {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
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
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              오늘의 인증을 완료했어요!
            </h2>
            <p className="text-gray-600 mb-6">
              오늘은 이미 인증을 완료했습니다.
              <br />
              내일 다시 도전해보세요!
            </p>
            <button
              onClick={() => navigate(`/challenge/${challengeId}`)}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
            >
              챌린지 상세로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="space-y-6">
          {/* 인증 사진 업로드 */}
          <div className="space-y-3">
            <label className="text-base font-semibold text-gray-800">
              인증 사진
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="border-1 border-gray-300 rounded-2xl w-24 h-24 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="인증 사진 미리보기"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-300"
                      fill="currentColor"
                      stroke="white"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="none"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="text-sm text-gray-500">
                      {imagePreview ? 1 : 0}/1
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 인증 게시물 제목 */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="title" className="block font-semibold">
                게시물 제목
              </label>
              <span className="text-sm text-gray-500">{title.length}/20</span>
            </div>
            <div className="relative">
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => {
                  if (e.target.value.length <= 20) {
                    setTitle(e.target.value);
                  }
                }}
                placeholder="오늘의 인증 제목을 입력하세요"
                maxLength={20}
                className={`w-full px-4 py-3 pr-10 rounded-2xl border-2 transition-all duration-200 outline-none
                ${
                  title.trim()
                    ? "bg-white border-gray-100 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                    : "bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                }`}
              />
              {/* X 버튼 */}
              {title.trim() && (
                <button
                  type="button"
                  onClick={() => setTitle("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 
                  bg-gray-300 hover:bg-gray-400 text-white rounded-full 
                  flex items-center justify-center transition-colors duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* 인증 게시물 내용 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="content" className="block font-semibold">
                게시물 내용
              </label>
              <span className="text-sm text-gray-500">
                {content.length}/200
              </span>
            </div>
            <textarea
              id="content"
              value={content}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setContent(e.target.value);
                }
              }}
              placeholder="오늘의 인증 내용을 자유롭게 작성해주세요"
              rows={6}
              maxLength={200}
              className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-200 outline-none resize-none
              ${
                content.trim()
                  ? "bg-white border-gray-100 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  : "bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              }`}
            />
          </div>
        </div>
      </div>

      {/* 작성 완료 버튼 */}
      <BoxButtonLarge
        onClick={handleSubmit}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting
          ? "등록 중..."
          : mode === "edit"
            ? "수정 완료"
            : "작성 완료"}
      </BoxButtonLarge>

      <Toast
        message={
          mode === "edit" ? "인증이 수정되었습니다." : "인증이 완료되었습니다."
        }
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <FormConfirmModal
        isOpen={showConfirmModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCancel}
        title="인증"
      />
    </div>
  );
}
