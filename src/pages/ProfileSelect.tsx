import { useMe } from "@/hooks/useMe";
import BoxButtonLarge from "@/components/common/BoxButtonLarge";
import ProfileSelectModal from "@/components/common/ProfileSelectModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ImageOption {
  id: number;
  src: string;
  alt: string;
  imgClass?: string;
}

export default function ProfileSelect() {
  const { data } = useMe();
  const navigate = useNavigate();

  const nickname = data?.properties?.nickname ?? "";

  const [selectedImage, setSelectedImage] = useState<ImageOption | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelect = (imageInfo: ImageOption) => {
    setSelectedImage(imageInfo);
    console.log("선택된 프로필:", imageInfo);
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      navigate("/home");
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex flex-col min-h-dvh py-15 px-10 items-center justify-between">
      <div className="flex flex-col mt-10 items-center justify-center">
        <p className="text-2xl font-semibold">
          {nickname ? `반가워요 ${nickname}님!` : "반갑습니다."}
        </p>
        <p className="text-2xl font-semibold">사용하실 프로필을 골라주세요.</p>
      </div>
      <div className="flex flex-col items-center gap-5">
        {selectedImage !== null ? (
          <button
            type="button"
            onClick={openModal}
            className="w-[70%] h-[70%] p-10 rounded overflow-hidden border bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-200 transition hover:shadow-md"
            aria-label="이미지 선택 열기"
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className={`w-full h-full object-contain ${selectedImage.imgClass || ""}`}
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
        <p className="text-2xl font-bold">{nickname}</p>
      </div>
      {/* TODO: 이미지 선택 안 하고 다음 누르면 스낵바 */}
      <BoxButtonLarge disabled={selectedImage === null} onClick={handleNext}>
        다음
      </BoxButtonLarge>

      <ProfileSelectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelect={handleSelect}
        selectedId={selectedImage?.id || null}
      />
    </div>
  );
}
