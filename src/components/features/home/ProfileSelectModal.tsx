import { useEffect } from "react";

interface ProfileSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageInfo: {
    id: number;
    src: string;
    alt: string;
    imgClass: string;
  }) => void;
  selectedId: number | null;
}

export default function ProfileSelectModal({
  isOpen,
  onClose,
  onSelect,
  selectedId,
}: ProfileSelectModalProps) {
  const options = [
    { id: 0, src: "/public/images/cat1.webp", alt: "옵션 1", imgClass: "" },
    {
      id: 1,
      src: "/public/images/cat2.webp",
      alt: "옵션 2",
      imgClass: "h-300",
    },
  ];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />

      <div className="absolute inset-x-4 bottom-10 sm:inset-0 sm:m-auto sm:h-auto sm:max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">프로필 이미지 선택</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        <div className="py-5 px-10">
          <div className="grid grid-cols-2 gap-4 justify-items-center">
            {options.map((opt) => {
              const isSelected = selectedId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    onSelect(opt);
                    onClose();
                  }}
                  className={`h-35 w-35 rounded-xl border-2 transition-all duration-200 ease-out 
                    ${isSelected ? "border-blue-500 ring-4 ring-blue-200 scale-105 shadow-xl" : "border-transparent hover:scale-105 hover:shadow-lg active:scale-95"}
                  `}
                >
                  <img
                    src={opt.src}
                    alt={opt.alt}
                    className={`w-full h-full object-contain ${opt.imgClass || ""}`}
                  />

                  {isSelected && (
                    <span className="absolute top-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/90 shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="3"
                        className="w-4 h-4"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
