import React from "react";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-dvh w-full bg-gray-50">
      <div className="mx-auto min-h-dvh max-w-[393px] border-x border-neutral-200 bg-white">
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
