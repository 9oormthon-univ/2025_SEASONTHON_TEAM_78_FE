import { useMe } from "@/hooks/useMe";
import BoxButtonLarge from "@/components/common/BoxButtonLarge";
import { useEffect, useState } from "react";

export default function Home() {
  const { data } = useMe();

  const nickname = data?.properties?.nickname ?? "";

  const options = [
    { id: 0, src: "/public/images/cat1.png", alt: "옵션 1", imgClass: "" },
    { id: 1, src: "/public/images/cat2.png", alt: "옵션 2", imgClass: "h-300" },
  ];

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const openPicker = () => setIsPickerOpen(true);
  const closePicker = () => setIsPickerOpen(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePicker();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex flex-col min-h-dvh gap-10 p-10 items-center justify-center">
      <p className="text-2xl font-semibold text-center">
        {nickname ? `반가워요 ${nickname}님!` : "반갑습니다."} <br />
        사용하실 프로필을 골라주세요.
      </p>

      {/* 현재 선택 썸네일 또는 + 버튼 */}
      <div className="flex items-center gap-5">
        {selectedId !== null ? (
          <button
            type="button"
            onClick={openPicker}
            className="w-28 h-28 rounded-2xl overflow-hidden border bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-200 transition hover:shadow-md"
            aria-label="이미지 선택 열기"
          >
            {(() => {
              const sel = options.find((o) => o.id === selectedId);
              if (!sel) return null;
              return (
                <img
                  src={sel.src}
                  alt="선택된 이미지"
                  className={`w-full h-full object-contain ${sel.imgClass || ""}`}
                />
              );
            })()}
          </button>
        ) : (
          <button
            type="button"
            onClick={openPicker}
            className="w-12 h-12 rounded-full bg-white border shadow flex items-center justify-center text-2xl text-blue-600 hover:bg-blue-50 active:scale-95 transition"
            aria-label="이미지 선택 열기"
          >
            +
          </button>
        )}
      </div>

      <BoxButtonLarge disabled={selectedId === null}>다음</BoxButtonLarge>

      {/* 이미지 선택 모달 */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closePicker}
            aria-hidden
          />

          <div className="absolute inset-x-4 bottom-10 sm:inset-0 sm:m-auto sm:h-auto sm:max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">프로필 이미지 선택</h2>
              <button
                type="button"
                onClick={closePicker}
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
                        setSelectedId(opt.id);
                        closePicker();
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
                onClick={closePicker}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
