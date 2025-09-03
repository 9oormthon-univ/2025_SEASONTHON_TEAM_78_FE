import BoxButtonLarge from "@/components/common/BoxButtonLarge";

interface ChallengeButtonsProps {
  isFormValid: boolean;
  onCreate: () => void;
  onCancel: () => void;
}

export default function ChallengeButtons({
  isFormValid,
  onCreate,
  onCancel,
}: ChallengeButtonsProps) {
  return (
    <div className="space-y-3 mt-8">
      <BoxButtonLarge onClick={onCreate} disabled={!isFormValid}>
        챌린지 생성하기
      </BoxButtonLarge>
      <button
        type="button"
        onClick={onCancel}
        className="w-full py-3 text-gray-600 hover:text-gray-800 transition-colors"
      >
        취소
      </button>
    </div>
  );
}
