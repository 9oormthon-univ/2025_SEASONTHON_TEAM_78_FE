import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavBar from "@/components/Navbar/TopNavBar";
import BottomNavBar from "@/components/Navbar/BottomNavBar";
import IconSelector from "@/components/features/create-challenge/IconSelector";
import ChallengeForm from "@/components/features/create-challenge/ChallengeForm";
import ChallengeButtons from "@/components/features/create-challenge/ChallengeButtons";

type IconName = "ball" | "book" | "broom" | "bus" | "edit" | "water";

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
    // TODO: 챌린지 생성 API 호출
    console.log("챌린지 생성:", {
      challengeTitle,
      challengeDescription,
      selectedIcon,
      challengeDuration,
    });
    navigate("/home");
  };

  const isFormValid = challengeTitle.trim().length > 0 && selectedIcon !== null;

  return (
    <>
      <TopNavBar title="챌린지 추가" />
      <div className="flex flex-col min-h-screen px-6 py-8">
        <div className="flex-1 space-y-8">
          <IconSelector
            selectedIcon={selectedIcon}
            onIconSelect={setSelectedIcon}
          />

          <ChallengeForm
            title={challengeTitle}
            description={challengeDescription}
            duration={challengeDuration}
            onTitleChange={setChallengeTitle}
            onDescriptionChange={setChallengeDescription}
            onDurationChange={setChallengeDuration}
          />
        </div>

        <ChallengeButtons
          isFormValid={isFormValid}
          onCreate={handleCreate}
          onCancel={handleBack}
        />
      </div>
      <BottomNavBar />
    </>
  );
}
