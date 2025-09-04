import BoxButtonLarge from "@/components/common/BoxButtonLarge";

interface ChallengeButtonsProps {
  isFormValid: boolean;
  onCreate: () => void;
}

export default function ChallengeButtons({
  isFormValid,
  onCreate,
}: ChallengeButtonsProps) {
  return (
    <div className="absolute bottom-0 w-full">
      <div className="absolute inset-0 bg-gray-50/50 backdrop-blur-sm"></div>
      <div className="relative z-10 p-6">
        <BoxButtonLarge onClick={onCreate} disabled={!isFormValid}>
          챌린지 등록하기
        </BoxButtonLarge>
      </div>
    </div>
  );
}
