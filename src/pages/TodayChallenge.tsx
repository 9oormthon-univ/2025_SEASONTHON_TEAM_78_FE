import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BackNavBar from "@/components/Navbar/BackNavBar";
import { type IconName } from "@/types/challenge";
import TodayChallengeForm from "@/components/features/today-challenge/TodayChallengeForm";

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

export default function TodayChallenge() {
  const { id, certificationId } = useParams<{
    id: string;
    certificationId?: string;
  }>();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [certification, setCertification] = useState<Certification | null>(
    null
  );

  useEffect(() => {
    if (id) {
      // 로컬 스토리지에서 챌린지 찾기
      const challenges = JSON.parse(localStorage.getItem("challenges") || "[]");
      const foundChallenge = challenges.find((c: Challenge) => c.id === id);
      setChallenge(foundChallenge || null);
    }
  }, [id]);

  useEffect(() => {
    if (certificationId) {
      // 로컬 스토리지에서 인증 데이터 찾기
      const certifications = JSON.parse(
        localStorage.getItem("certifications") || "[]"
      );
      const foundCertification = certifications.find(
        (c: Certification) => c.id === certificationId
      );
      setCertification(foundCertification || null);
    }
  }, [certificationId]);

  const handleSuccess = () => {
    navigate(`/challenge/${id}`);
  };

  const isEditMode = !!certificationId;

  return (
    <div className="flex flex-col h-screen">
      <BackNavBar title={isEditMode ? "인증 수정" : "오늘의 인증"} />
      <TodayChallengeForm
        challengeId={id || ""}
        challenge={challenge}
        certification={certification}
        mode={isEditMode ? "edit" : "create"}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
