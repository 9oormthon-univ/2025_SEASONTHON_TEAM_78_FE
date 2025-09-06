import { useState, useEffect } from "react";
import { useMe } from "@/hooks/useMe";
import { useNavigate } from "react-router-dom";
import ProfileContent from "@/components/features/profile-select/ProfileContent";
import BoxButtonLarge from "@/components/common/BoxButtonLarge";
import { updateUserProfile } from "@/lib/api/user";

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

  useEffect(() => {
    if (data && !isLoading) {
      if (data.picture) {
        if (data.picture.length > 1) {
          navigate("/profile-select", { replace: true });
        } else if (data.picture.length === 1) {
          navigate("/home", { replace: true });
        } else {
          throw new Error("사용자 프로필에 picture 정보가 없습니다.");
        }
      } else {
        navigate("/profile-select", { replace: true });
      }
    }
  }, [data, isLoading, navigate]);

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

  const handleNext = async () => {
    if (selectedImage !== null) {
      try {
        await updateUserProfile({
          picture: selectedImage.id,
          nickname: nickname,
        });
        navigate("/home");
      } catch (error) {
        console.error("프로필 업데이트 오류:", error);
        navigate("/home");
      }
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
