import { useState } from "react";
import BottomSheet from "@/components/common/BottomSheet";

type Sticker = { id: number; src: string; alt: string };

const STICKERS: Sticker[] = [
  { id: 1, src: "/images/emoji-cool.webp", alt: "cool" },
  { id: 2, src: "/images/emoji-heart.webp", alt: "heart" },
  { id: 3, src: "/images/emoji-wow.webp", alt: "wow" },
];

interface CheerBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (stickerId: number) => void;
}

function CheerBottomSheet({
  isOpen,
  onClose,
  onSubmit,
}: CheerBottomSheetProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleConfirm = () => {
    if (selected == null) return;
    onSubmit?.(selected);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="px-4 pb-8 pt-2">
        <p className="mb-5 text-center text-lg font-semibold text-black">
          응원과 보낼 스티커를 선택해주세요.
        </p>
        <div className="mb-6 flex items-center justify-center gap-4">
          {STICKERS.map((s) => {
            const isActive = s.id === selected;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelected(s.id)}
                className={[
                  "flex h-24 w-24 items-center justify-center rounded-[20px] bg-[#f4f7fb]",
                  "transition",
                  isActive
                    ? "border-2 border-[#4672ff] shadow-[0_4px_10px_0_rgba(0,0,0,0.1)]"
                    : "border border-transparent",
                ].join(" ")}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  className="h-20 w-20 object-contain"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
        <div>
          <button
            type="button"
            disabled={selected == null}
            onClick={handleConfirm}
            className={[
              "mx-auto mb-1 block h-16 w-[343px] rounded-[50px] text-base font-bold text-white",
              selected != null
                ? "bg-gradient-to-b from-[#4672FF] to-[#8DB7FF]"
                : "bg-gray-300",
            ].join(" ")}
          >
            응원 보내기
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}

export default CheerBottomSheet;
