import { useMe } from "@/hooks/useMe";
import BoxButtonLarge from "@/components/common/BoxButtonLarge";
import ProfileSelectModal from "@/components/features/home/ProfileSelectModal";
import { useEffect, useState } from "react";

interface ImageOption {
  id: number;
  src: string;
  alt: string;
  imgClass: string;
}

export default function ProfileSelect() {
  const { data } = useMe();

  const nickname = data?.properties?.nickname ?? "";

  const [selectedImage, setSelectedImage] = useState<ImageOption | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelect = (imageInfo: ImageOption) => {
    setSelectedImage(imageInfo);
    console.log("선택된 프로필:", imageInfo);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
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

      <div className="flex items-center gap-5">
        {selectedImage !== null ? (
          <button
            type="button"
            onClick={openModal}
            className="w-28 h-28 rounded-2xl overflow-hidden border bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-200 transition hover:shadow-md"
            aria-label="이미지 선택 열기"
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className={`w-full h-full object-contain p-1 ${selectedImage.imgClass || ""}`}
            />
          </button>
        ) : (
          <button
            type="button"
            onClick={openModal}
            className="w-12 h-12 rounded-full bg-white border shadow flex items-center justify-center text-2xl text-blue-600 hover:bg-blue-50 active:scale-95 transition cursor-pointer"
            aria-label="이미지 선택 열기"
          >
            +
          </button>
        )}
      </div>

      <BoxButtonLarge disabled={selectedImage === null}>다음</BoxButtonLarge>

      <ProfileSelectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelect={handleSelect}
        selectedId={selectedImage?.id || null}
      />
    </div>
  );
}
