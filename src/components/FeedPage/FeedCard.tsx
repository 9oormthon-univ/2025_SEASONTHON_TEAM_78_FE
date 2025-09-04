import BundleIcon from '@/assets/bundle-icon.svg';
import type { MouseEventHandler } from 'react';

interface FeedCardProps {
  imageUrl: string;
  //bundleIconUrl: string;
  totalCheers: number; // 응원 총합
  onCheer?: MouseEventHandler<HTMLButtonElement>;

  profileUrl: string; // 작성자 프로필
  nickname: string; // 닉네임
  challengeTitle: string; // 챌린지 제목
  content: string; // 챌린지 내용(긴 텍스트, UI는 2줄)

  onClickContent?: () => void; // 내용 클릭 시 모달 오픈(나중에 연결)
  className?: string;
}

function FeedCard({
  imageUrl,
  totalCheers,
  onCheer,
  profileUrl,
  nickname,
  challengeTitle,
  content,
  onClickContent,
  className = '',
}: FeedCardProps) {
  return (
    <article
      className={
        'relative w-[343px] h-[343px] overflow-hidden rounded-[40px] ' +
        'bg-[#EFF1F5] ring-1 ring-black/5 shadow-sm ' +
        className
      }
    >
      {/* 배경 이미지 */}
      <img
        src={imageUrl}
        alt={`${nickname}의 인증 사진`}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />

      {/* 좌측 상단 */}

      <div className="absolute left-6 top-6 flex items-center gap-2 ">
        <img
          src={BundleIcon}
          alt="번들 아이콘"
          className="h-[36px] w-[68px] object-cover"
          loading="lazy"
        />
        <span className="px-2 py-0.5 text-[18px] font-bold text-white ">
          {totalCheers}
        </span>
      </div>

      {/* 응원하기 버튼 */}
      <button
        type="button"
        onClick={onCheer}
        className="absolute top-6 right-6 rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#7C8086] shadow-[0_4px_10px_0_rgba(0,0,0,0.2)]"
      >
        응원하기
      </button>

      {/* 하단 그라데이션*/}
      <div className="absolute inset-x-0 bottom-0">
        <div className="h-28 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* 하단 내용 */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="mb-1.5 flex items-center gap-1.5">
          <img
            src={profileUrl}
            alt={`${nickname} 프로필`}
            className="h-4 w-4 rounded-full object-cover"
            loading="lazy"
          />
          <span className="text-[14px] font-bold text-white">{nickname}</span>
        </div>

        <h3 className="mb-1.5 text-[18px] font-bold leading-tight text-white">
          {challengeTitle}
        </h3>

        {/* 챌린지 내용 2줄만 */}
        <button
          type="button"
          onClick={onClickContent}
          className="block w-full text-left "
        >
          <span className="text-[14px] leading-5 text-white clamp-2">
            {content}
          </span>
        </button>
      </div>
    </article>
  );
}

export default FeedCard;
