import { useMemo } from "react";
import type { ReactNode } from "react";

interface TopNavBarProps {
  title?: string;
  showToday?: boolean;
  icon?: ReactNode;
}

function formatToday() {
  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  return `${m}월 ${d}일`;
}

function TopNavBar({ title, showToday = false, icon }: TopNavBarProps) {
  const today = useMemo(() => formatToday(), []);
  const display = showToday ? today : title;

  return (
    <div className="sticky top-0 flex items-center gap-4 px-4 pt-4 pb-3.5 bg-white/70 border-b border-[#f4f7fb] backdrop-blur-[10px] z-50">
      <div className="flex items-center gap-2">
        <p className="text-3xl text-left text-[#161616] select-none truncate">
          {display}
        </p>
        {icon}
      </div>
    </div>
  );
}

export default TopNavBar;
