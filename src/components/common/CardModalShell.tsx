//색만 바꿔서 재사용 가능하도록

import type { ReactNode } from 'react';
import CloseIcon from '@/assets/close.svg';
import { MODAL_THEME } from '@/components/common/modalTheme';
import type { IconName } from '@/components/Icon/ChallengeIcon';

type Variant = 'themed' | 'white';

interface CardModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  iconName?: IconName; // themed일 때만 필요
  variant?: Variant; // 기본값: white
  children?: ReactNode;
  className?: string;
}

function CardModalShell({
  isOpen,
  onClose,
  title = '',
  iconName,
  variant = 'white',
  children,
  className = '',
}: CardModalShellProps) {
  if (!isOpen) return null;

  const bgClass =
    variant === 'themed' && iconName ? MODAL_THEME[iconName].bg : 'bg-white';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Card */}
      <div
        className={[
          'relative flex w-[343px] max-w-[90vw] flex-col overflow-hidden rounded-[30px] shadow-xl',
          bgClass,
          className,
        ].join(' ')}
      >
        {/* Header */}
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

        {/* Body */}
        <div className="flex flex-col gap-4 px-4 pb-6">{children}</div>
      </div>
    </div>
  );
}

export default CardModalShell;
