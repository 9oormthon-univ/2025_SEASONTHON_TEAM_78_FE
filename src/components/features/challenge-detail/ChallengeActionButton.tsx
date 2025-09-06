import BoxButtonLarge from "@/components/common/BoxButtonLarge";

interface ChallengeActionButtonProps {
  hasTodayCertification: boolean;
  challengeId: string;
  onNavigate: (path: string) => void;
}

export default function ChallengeActionButton({
  hasTodayCertification,
  challengeId,
  onNavigate,
}: ChallengeActionButtonProps) {
  return (
    <BoxButtonLarge
      onClick={
        hasTodayCertification
          ? undefined
          : () => onNavigate(`/challenge/${challengeId}/today`)
      }
      disabled={hasTodayCertification}
    >
      {hasTodayCertification
        ? "오늘의 인증을 마쳤어요!"
        : "오늘의 인증 추가하기"}
    </BoxButtonLarge>
  );
}
