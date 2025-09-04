import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import CloseIcon from '@/assets/close.svg';

interface FeedDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  profileUrl: string;
  nickname: string;
  challengeTitle: string;
  content: string;
}

function FeedDetailModal({
  isOpen,
  onClose,
  imageUrl,
  profileUrl,
  nickname,
  challengeTitle,
  content,
}: FeedDetailModalProps) {
  // ESC 닫기 + 스크롤 락
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[230]">
      {/* 배경 */}
      <button className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="w-full max-w-[480px] overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
          {/* 헤더 */}
          <div className="flex items-center justify-between  px-4 py-3">
            <p className="flex-1 text-center text-sm font-semibold text-[#161616]">
              {challengeTitle}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="flex h-6 w-6 items-center justify-center"
            >
              <img src={CloseIcon} alt="닫기" className="h-6 w-6" />
            </button>
          </div>

          {/* 내용 */}
          <div className="max-h-[80vh] overflow-y-auto px-4 pb-5 pt-4">
            <div className="mb-4 overflow-hidden rounded-xl">
              <img
                src={imageUrl}
                alt={`${nickname}의 인증 이미지`}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="mb-3 flex items-center gap-2">
              <img
                src={profileUrl}
                alt={`${nickname} 프로필`}
                className="h-8 w-8 rounded-full object-cover"
                loading="lazy"
              />
              <span className="text-sm font-semibold text-[#161616]">
                {nickname}
              </span>
            </div>

            <p className="whitespace-pre-line text-[15px] leading-6 text-[#393a3d]">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default FeedDetailModal;
