import React from "react";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-dvh w-full bg-gray-50">
      <div
        className="mx-auto flex min-h-dvh max-w-[393px] flex-col border-x border-neutral-200 bg-white
                      pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]"
      >
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
