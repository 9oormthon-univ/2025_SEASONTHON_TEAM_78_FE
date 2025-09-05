import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconSelector from "@/components/features/create-challenge/IconSelector";
import ChallengeForm from "@/components/features/create-challenge/ChallengeForm";
import BoxButtonLarge from "@/components/common/BoxButtonLarge";
import Toast from "@/components/common/Toast";
import BackNavBar from "@/components/Navbar/BackNavBar";
import FormConfirmModal from "@/components/common/FormConfirmModal";

type IconName =
  | "ball"
  | "book"
  | "broom"
  | "bus"
  | "edit"
  | "water"
  | "music"
  | "alarm"
  | "box"
  | "cook"
  | "moon"
  | "run";

export default function CreateChallenge() {
  const navigate = useNavigate();
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<IconName | null>(null);
  const [challengeDuration, setChallengeDuration] = useState(7);
  const [showToast, setShowToast] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 작성 중인 내용이 있는지 확인 (제목과 내용만)
  const hasContent =
    challengeTitle.trim().length > 0 || challengeDescription.trim().length > 0;

  // 모달 핸들러
  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
    navigate("/home");
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

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

  const handleCreate = () => {
    // 챌린지 데이터 생성(임시)
    const newChallenge = {
      id: Date.now().toString(),
      title: challengeTitle,
      description: challengeDescription,
      icon: selectedIcon,
      duration: challengeDuration,
      createdAt: new Date().toISOString(),
      status: "pending" as const,
    };

    // 로컬 스토리지에서 기존 챌린지 목록 가져오기(임시)
    const existingChallenges = JSON.parse(
      localStorage.getItem("challenges") || "[]"
    );

    // 새 챌린지 추가
    const updatedChallenges = [...existingChallenges, newChallenge];
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
    console.log("챌린지 등록 완료:", newChallenge);
    setShowToast(true);

    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  const isFormValid =
    challengeTitle.trim().length > 0 &&
    challengeDescription.trim().length > 0 &&
    challengeDuration > 0 &&
    selectedIcon !== null;

  return (
    <div className="flex flex-col h-screen">
      <BackNavBar title="새로운 챌린지 추가" />
      <div className="flex-1 overflow-y-auto space-y-8 px-8 pt-8 pb-30">
        <ChallengeForm
          title={challengeTitle}
          description={challengeDescription}
          duration={challengeDuration}
          onTitleChange={setChallengeTitle}
          onDescriptionChange={setChallengeDescription}
          onDurationChange={setChallengeDuration}
        />
        <IconSelector
          selectedIcon={selectedIcon}
          onIconSelect={setSelectedIcon}
        />
      </div>
      <BoxButtonLarge onClick={handleCreate} disabled={!isFormValid}>
        챌린지 등록하기
      </BoxButtonLarge>

      <Toast
        message="챌린지 추가가 완료되었습니다."
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <FormConfirmModal
        isOpen={showConfirmModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCancel}
        title="챌린지"
      />
    </div>
  );
}
