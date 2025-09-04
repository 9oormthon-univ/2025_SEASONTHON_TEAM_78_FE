import CloseIcon from '@/assets/close.svg';
import { MODAL_THEME } from '@/components/common/modalTheme';
import ChallengeIcon, { type IconName } from '@/components/Icon/ChallengeIcon';

interface CollectionCardFrontProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  iconName: IconName; // 필수
  onFlip?: () => void;
}

function CollectionCardFront({
  isOpen,
  onClose,
  title,
  iconName,
  onFlip,
}: CollectionCardFrontProps) {
  if (!isOpen) return null;

  const bgClass = MODAL_THEME[iconName].bg;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* 반투명 검정 배경 */}
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div
        className={[
          'relative flex h-[627px] w-[343px] max-w-[90vw] flex-col overflow-hidden rounded-[30px] shadow-xl',
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
          className="flex cursor-pointer flex-col gap-[26px] px-4 pb-6"
          onClick={onFlip}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onFlip?.()}
        >
          <div className="flex items-center gap-4">
            <div className="rounded-[20px] bg-white/40 p-5">
              <ChallengeIcon name={iconName} variant="black" alt={title} />
            </div>
            <div className="flex flex-col gap-2 py-2.5">
              <p className="text-left text-xl font-bold text-black">{title}</p>
            </div>
          </div>

          {/* 그래픽으로 바뀔예정 */}
          <div className="flex h-[311px] w-[311px] items-center justify-center rounded-[40px] bg-white/40 p-6">
            <p className="text-xl font-bold text-black">달성! 그래픽</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionCardFront;
