import CloseIcon from '@/assets/close.svg';
import HeartIcon from '@/assets/heart.svg'; //
import { MODAL_THEME } from '@/components/common/modalTheme';
import type { IconName } from '@/components/Icon/ChallengeIcon';

interface CollectionCardBackProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  iconName: IconName;
  description?: string; // 설명
  count1?: number; // 이모티콘1
  count2?: number; // 이모티콘2
  count3?: number; // 이모티콘3
  onFlip?: () => void;
}

function CollectionCardBack({
  isOpen,
  onClose,
  title,
  iconName,
  description = '',
  count1 = 0,
  count2 = 0,
  count3 = 0,
  onFlip,
}: CollectionCardBackProps) {
  if (!isOpen) return null;

  const bgClass = MODAL_THEME[iconName].bg;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <button
        type="button"
        aria-label="닫기"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div
        className={[
          'relative flex w-[343px] h-[627px] max-w-[90vw] flex-col overflow-hidden rounded-[30px] shadow-xl',
          bgClass,
        ].join(' ')}
      >
        <div className="flex items-center justify-center gap-[42px] p-4">
          <div className="h-6 w-6" />
          <p className="flex-1 text-center text-sm font-semibold text-[#161616]">
            {title}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center"
          >
            <img src={CloseIcon} alt="닫기" className="h-6 w-6" />
          </button>
        </div>

        <div
          className="flex cursor-pointer flex-col items-center gap-[26px] px-4 pt-4 pb-[26px]"
          onClick={onFlip}
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onFlip?.()}
        >
          {/*  챌린지 첫 인증샷 넣을예정 */}
          <div
            className="
              h-[311px] w-[311px] rounded-[40px] p-6
              bg-white/40
              [background-image:conic-gradient(#e5e7eb_25%,transparent_0_50%,#e5e7eb_0_75%,transparent_0)]
              [background-size:20px_20px]
            "
          />

          <div className="flex w-[311px] flex-col items-center gap-2">
            <p className="text-xl font-bold text-[#161616]">{title}</p>
            <p className="w-[311px] text-center text-sm text-[#393a3d]">
              {description}
            </p>
          </div>

          {/* 이모티콘 만들어지면 수정하기 */}
          <div className="flex items-center justify-center gap-[42px]">
            <div className="flex w-12 flex-col items-center gap-1.5">
              <img src={HeartIcon} alt="heart" className="h-12 w-12" />
              <p className="text-sm font-semibold text-black">{count1}개</p>
            </div>
            <div className="flex w-12 flex-col items-center gap-1.5">
              <img src={HeartIcon} alt="heart" className="h-12 w-12" />
              <p className="text-sm font-semibold text-black">{count2}개</p>
            </div>
            <div className="flex w-12 flex-col items-center gap-1.5">
              <img src={HeartIcon} alt="heart" className="h-12 w-12" />
              <p className="text-sm font-semibold text-black">{count3}개</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionCardBack;
