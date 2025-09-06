import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import BackNavBar from "@/components/Navbar/BackNavBar";
import FormConfirmModal from "@/components/common/FormConfirmModal";
import ChallengeHeader from "@/components/features/challenge-detail/ChallengeHeader";
import ChallengeStats from "@/components/features/challenge-detail/ChallengeStats";
import CertificationList from "@/components/features/challenge-detail/CertificationList";
import ChallengeActionButton from "@/components/features/challenge-detail/ChallengeActionButton";
import { getChallengeDetail, deleteChallenge } from "@/lib/api/challenges";
import type { ChallengeDetailResponse } from "@/types/challenge";

// API 응답의 data 부분을 위한 타입
type ChallengeData = ChallengeDetailResponse["data"];

// Certification 타입 정의
interface Certification {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
  createdAt: string;
  reactions: Array<{
    emojiType: string;
    count: number;
  }>;
}

export default function ChallengeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [hasTodayCertification, setHasTodayCertification] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 챌린지 상세 정보 조회
  const {
    data: challenge,
    isLoading,
    isError,
  } = useQuery<ChallengeData>({
    queryKey: ["challengeDetail", id],
    queryFn: () => getChallengeDetail(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (challenge?.certifications) {
      setCertifications(challenge.certifications);
    }
    setHasTodayCertification(false);
  }, [challenge]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!id) return;

    setIsDeleting(true);
    try {
      await deleteChallenge(id);

      // 관련 쿼리 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["notCertifiedChallenges"] });
      queryClient.invalidateQueries({ queryKey: ["certifiedChallenges"] });
      queryClient.invalidateQueries({ queryKey: ["challengeDetail"] });

      setShowDeleteModal(false);
      // 홈 페이지로 이동
      navigate("/home");
    } catch (error) {
      console.error("챌린지 삭제 중 오류가 발생했습니다:", error);
      alert("챌린지 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsDeleting(false);
    }
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
        onActionClick={handleDeleteClick}
      />
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <ChallengeHeader challenge={challenge} />
          <ChallengeStats challenge={challenge} />
          <CertificationList
            certifications={certifications}
            challengeTitle={challenge.title}
          />
          <ChallengeActionButton
            hasTodayCertification={hasTodayCertification}
            challengeId={id!}
            onNavigate={navigate}
          />
        </div>
      </div>

      {/* 챌린지 삭제 확인 모달 */}
      <FormConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        variant="custom"
        title="챌린지 삭제"
        message={`정말로 이 챌린지를 삭제하시겠습니까?
                  삭제된 챌린지는 복구할 수 없으며,
                  모든 인증 데이터가 함께 삭제됩니다.`}
        confirmText="삭제"
        cancelText="취소"
        isLoading={isDeleting}
        confirmButtonColor="red"
      />
    </div>
  );
}
