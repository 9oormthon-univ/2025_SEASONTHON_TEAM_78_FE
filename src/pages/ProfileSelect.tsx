import { useState } from "react";
import { useMe } from "@/hooks/useMe";
import { useNavigate } from "react-router-dom";
import ProfileContent from "@/components/features/profile-select/ProfileContent";
import BoxButtonLarge from "@/components/common/BoxButtonLarge";

interface ImageOption {
  id: number;
  src: string;
  alt: string;
  imgClass?: string;
}

export default function ProfileSelect() {
  const { data, isLoading, isError } = useMe();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<ImageOption | null>(null);

  const nickname = data?.nickname ?? "";

  // 로딩 중이거나 에러가 있으면 로딩 표시
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-dvh pb-30 pt-15 px-10 items-center justify-center">
        <div className="text-gray-500">사용자 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col min-h-dvh pb-30 pt-15 px-10 items-center justify-center">
        <div className="text-red-500">사용자 정보를 불러올 수 없습니다.</div>
      </div>
    );
  }

  const handleImageSelect = (imageInfo: ImageOption | null) => {
    setSelectedImage(imageInfo);
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      navigate("/home");
    }
  };

  return (
    <div className="flex flex-col min-h-dvh pb-30 pt-15 px-10 items-center justify-center">
      <ProfileContent nickname={nickname} onImageSelect={handleImageSelect} />
      <BoxButtonLarge disabled={selectedImage === null} onClick={handleNext}>
        다음
      </BoxButtonLarge>
    </div>
  );
}
