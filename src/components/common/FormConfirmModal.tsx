interface FormConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: "form" | "delete" | "custom";
  confirmButtonColor?: "blue" | "red" | "gray";
}

export default function FormConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  isLoading = false,
  variant = "form",
  confirmButtonColor = "blue",
}: FormConfirmModalProps) {
  // 기본 메시지와 텍스트 설정
  const getDefaultContent = () => {
    switch (variant) {
      case "delete":
        return {
          message:
            "정말로 삭제하시겠습니까?\n삭제된 내용은 복구할 수 없습니다.",
          confirmText: "삭제",
          cancelText: "취소",
          title: "삭제",
        };
      case "form":
        return {
          message: "작성 중에 나가면 지금까지\n작성한 내용이 모두 삭제됩니다.",
          confirmText: "작성 취소",
          cancelText: "아니요",
          title: "작성",
        };
      default:
        return {
          message: "정말로 진행하시겠습니까?",
          confirmText: "확인",
          cancelText: "취소",
          title: "",
        };
    }
  };

  const defaultContent = getDefaultContent();
  const finalMessage = message || defaultContent.message;
  const finalConfirmText = confirmText || defaultContent.confirmText;
  const finalCancelText = cancelText || defaultContent.cancelText;
  const finalTitle = title || defaultContent.title;

  // 버튼 색상 클래스
  const getConfirmButtonClass = () => {
    const baseClass = "flex-1 p-4 rounded-full font-medium transition-colors";
    if (isLoading) {
      return `${baseClass} bg-gray-400 text-white cursor-not-allowed`;
    }

    switch (confirmButtonColor) {
      case "red":
        return `${baseClass} bg-gradient-to-b from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700`;
      case "gray":
        return `${baseClass} bg-gradient-to-b from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700`;
      default: // blue
        return `${baseClass} bg-gradient-to-b from-[#4672FF] to-[#8DB7FF] text-white hover:from-[#2B5BFF] hover:to-[#6B9FFF]`;
    }
  };

  const handleConfirm = async () => {
    if (isLoading) return;
    try {
      await onConfirm();
    } catch (error) {
      console.error("Confirm action failed:", error);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-2xl p-6 mx-5 max-w-sm w-full shadow-xl">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {finalTitle && `${finalTitle} `}
            {variant === "form"
              ? "작성을 취소하시겠습니까?"
              : variant === "delete"
                ? "삭제하시겠습니까?"
                : "진행하시겠습니까?"}
          </h3>
          <p className="text-gray-600 mb-6 break-words whitespace-pre-line">
            {finalMessage}
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 p-4 rounded-full font-medium border border-gray-300
               hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {finalCancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className={
                variant === "form"
                  ? "flex-1 p-4 bg-gradient-to-b from-[#4672FF] to-[#8DB7FF] text-white rounded-full font-medium hover:from-[#2B5BFF] hover:to-[#6B9FFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  : getConfirmButtonClass()
              }
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  처리 중...
                </div>
              ) : (
                finalConfirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
