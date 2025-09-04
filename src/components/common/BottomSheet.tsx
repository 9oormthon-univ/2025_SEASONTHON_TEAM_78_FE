import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
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
    <div className="fixed inset-0 z-[200]">
      <button className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <div className="w-full max-w-[480px] translate-y-0 rounded-t-[30px] bg-white shadow-[0_-6px_20px_0_rgba(0,0,0,0.15)] transition">
          <div className="flex justify-center pt-3">
            <div className="h-1 w-10 rounded-full bg-[#E7EAED]" />
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default BottomSheet;
