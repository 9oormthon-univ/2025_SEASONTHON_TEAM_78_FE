interface ChallengeConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ChallengeConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: ChallengeConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-2xl p-6 mx-5 max-w-sm w-full shadow-xl">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            챌린지 추가를 취소할까요?
          </h3>
          <p className="text-gray-600 mb-6">
            작성 중에 나가면 지금까지
            <br />
            작성한 내용이 모두 삭제됩니다.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 p-4 rounded-full font-medium border border-gray-300
               hover:bg-gray-100 transition-colors"
            >
              아니요
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 p-4 bg-gradient-to-b from-[#4672FF] to-[#8DB7FF] text-white rounded-full font-medium 
              hover:from-[#2B5BFF] hover:to-[#6B9FFF] transition-colors"
            >
              작성 취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
