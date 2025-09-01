import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
} from "@radix-ui/react-dialog";

interface OptionImage {
  id: number;
  src: string;
  alt: string;
  imgClass?: string;
}

interface ProfileSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageInfo: OptionImage) => void;
  selectedId: number | null;
}

export default function ProfileSelectModal({
  isOpen,
  onClose,
  onSelect,
  selectedId,
}: ProfileSelectModalProps) {
  const options: OptionImage[] = [
    { id: 1, src: "/images/cat1.webp", alt: "옵션 1" },
    { id: 2, src: "/images/cat2.webp", alt: "옵션 2" },
    { id: 3, src: "/images/cat1.webp", alt: "옵션 3" },
    { id: 4, src: "/images/cat2.webp", alt: "옵션 4" },
    { id: 5, src: "/images/cat1.webp", alt: "옵션 5" },
    { id: 6, src: "/images/cat2.webp", alt: "옵션 6" },
    { id: 7, src: "/images/cat1.webp", alt: "옵션 7" },
    { id: 8, src: "/images/cat2.webp", alt: "옵션 8" },
  ];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
      <DialogContent className="fixed left-1/2 top-1/2 z-50 max-h-[80vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between border-b border-gray-200 p-6 bg-gradient-to-r from-blue-300 to-indigo-100">
          <DialogTitle className="text-xl font-bold">
            프로필 이미지 선택
          </DialogTitle>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/50 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto px-8 py-8 bg-white">
          <div className="grid grid-cols-2 gap-8 justify-items-center">
            {options.map((opt) => {
              const isSelected = selectedId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onSelect(opt)}
                  className={`group relative w-[120px] h-[120px] overflow-hidden rounded-2xl border-2 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-offset-2
                    ${
                      isSelected
                        ? "border-blue-500 ring-4 ring-blue-200 scale-110 shadow-2xl shadow-blue-200/50"
                        : "border-gray-200 hover:border-blue-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-100/50 active:scale-95"
                    }`}
                >
                  <img
                    src={opt.src}
                    alt={opt.alt}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 ${opt.imgClass || ""}`}
                  />
                  {isSelected && (
                    <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                  <div
                    className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      isSelected
                        ? "bg-gradient-to-t from-blue-500/20 to-transparent"
                        : "bg-gradient-to-t from-black/0 to-black/0 group-hover:from-black/10 group-hover:to-black/5"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-white">
          <button
            type="button"
            onClick={() => {
              if (selectedId !== null) {
                const selectedOption = options.find((o) => o.id === selectedId);
                if (selectedOption) {
                  onSelect(selectedOption);
                  onClose();
                }
              }
            }}
            disabled={selectedId === null}
            className="rounded-full 
            bg-gradient-to-b from-[#4672FF] to-[#8DB7FF] hover:from-[#2B5BFF] hover:to-[#6B9FFF] 
            px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200
             disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:hover:shadow-lg"
          >
            선택
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
