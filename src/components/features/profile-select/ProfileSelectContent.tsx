import { useState } from 'react';
import BoxButtonLarge from '@/components/common/BoxButtonLarge';

interface ImageOption {
  id: number;
  src: string;
  alt: string;
  imgClass?: string;
}

interface ProfileSelectContentProps {
  nickname: string;
  onNext: (selectedImage: ImageOption | null) => void;
}

export default function ProfileSelectContent({
  nickname,
  onNext,
}: ProfileSelectContentProps) {
  const [selectedImage, setSelectedImage] = useState<ImageOption | null>(null);

  // 3개의 프로필 이미지 옵션
  const profileOptions: ImageOption[] = [
    {
      id: 1,
      src: '/images/emoji-wow.webp',
      alt: '프로필 이모지1',
      imgClass: 'rounded-full',
    },
    {
      id: 2,
      src: '/images/emoji-cool.webp',
      alt: '프로필 이모지2',
      imgClass: 'rounded-full',
    },
    {
      id: 3,
      src: '/images/emoji-heart.webp',
      alt: '프로필 이모지3',
      imgClass: 'rounded-full',
    },
  ];

  const handleSelect = (imageInfo: ImageOption) => {
    setSelectedImage(imageInfo);
    console.log('선택된 프로필:', imageInfo);
  };

  const handleNext = () => {
    onNext(selectedImage);
  };

  return (
    <div className="flex flex-col min-h-dvh pb-30 pt-15 px-10 items-center justify-center">
      <div className="flex flex-col mt-10 items-center justify-center">
        <p className="text-2xl font-semibold">
          {nickname ? `반가워요 ${nickname}님!` : '반갑습니다.'}
        </p>
        <p className="text-2xl font-semibold">사용하실 프로필을 골라주세요.</p>
      </div>

      {/* 중앙에 선택된 이미지 표시 */}
      <div className="flex flex-col items-center gap-5 my-8">
        {selectedImage ? (
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 shadow-lg">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
            <span className="text-4xl text-gray-500">?</span>
          </div>
        )}
        <p className="text-2xl font-bold">{nickname}</p>
      </div>

      {/* 3개의 프로필 옵션 */}
      <div className="flex gap-6 mb-8">
        {profileOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleSelect(option)}
            className={`w-20 h-20 rounded-full overflow-hidden bg-gray-100 transition-all duration-200 ${
              selectedImage?.id === option.id
                ? 'shadow-lg scale-110'
                : 'hover:scale-105'
            }`}
            aria-label={option.alt}
          >
            <img
              src={option.src}
              alt={option.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* 하단 버튼 */}
      <BoxButtonLarge disabled={selectedImage === null} onClick={handleNext}>
        다음
      </BoxButtonLarge>
    </div>
  );
}
