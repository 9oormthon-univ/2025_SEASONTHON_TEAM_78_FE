import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateChallengeHeader from "@/components/features/create-challenge/CreateChallengeHeader";
import IconSelector from "@/components/features/create-challenge/IconSelector";
import ChallengeForm from "@/components/features/create-challenge/ChallengeForm";
import ChallengeButtons from "@/components/features/create-challenge/ChallengeButtons";

type IconName =
  | "ball"
  | "book"
  | "broom"
  | "bus"
  | "edit"
  | "water"
  | "music"
  | "alarm";

export default function CreateChallenge() {
  const navigate = useNavigate();
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<IconName | null>(null);
  const [challengeDuration, setChallengeDuration] = useState(7);

  const handleBack = () => {
    navigate("/home");
  };

  const handleCreate = () => {
    // 챌린지 데이터 생성
    const newChallenge = {
      id: Date.now().toString(), // 임시 ID
      title: challengeTitle,
      description: challengeDescription,
      icon: selectedIcon,
      duration: challengeDuration,
      createdAt: new Date().toISOString(),
      status: "pending" as const,
    };

    // 로컬 스토리지에서 기존 챌린지 목록 가져오기
    const existingChallenges = JSON.parse(
      localStorage.getItem("challenges") || "[]"
    );

    // 새 챌린지 추가
    const updatedChallenges = [...existingChallenges, newChallenge];

    // 로컬 스토리지에 저장
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));

    console.log("챌린지 등록 완료:", newChallenge);
    navigate("/home");
  };

  const isFormValid =
    challengeTitle.trim().length > 0 &&
    challengeDescription.trim().length > 0 &&
    challengeDuration > 0 &&
    selectedIcon !== null;

  return (
    <div className="flex flex-col h-screen">
      <CreateChallengeHeader onBack={handleBack} />
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
      <div className="relative">
        <ChallengeButtons isFormValid={isFormValid} onCreate={handleCreate} />
      </div>
    </div>
  );
}
