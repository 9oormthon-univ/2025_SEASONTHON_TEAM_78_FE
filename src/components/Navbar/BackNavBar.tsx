import { useNavigate } from "react-router-dom";
import Back from "@/assets/back.svg";
import type { ReactNode } from "react";

interface BackHeaderProps {
  title: string;
  icon?: ReactNode; //오른쪽 아이콘
  actionPath?: string; //아이콘 클릭시 경로
  onActionClick?: () => void; //아이콘 클릭시 실행할 함수
}

const BackHeader = ({
  title,
  icon,
  actionPath,
  onActionClick,
}: BackHeaderProps) => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleClickAction = () => {
    if (onActionClick) {
      onActionClick();
    } else if (actionPath) {
      navigate(actionPath);
    }
  };

  return (
    <div className="sticky top-0 flex items-center justify-between p-3 px-5 bg-[#F8F8F8] z-50">
      <button
        type="button"
        onClick={handleClickBack}
        className="cursor-pointer"
      >
        <img src={Back} alt="뒤로가기" className="w-6 h-6" />
      </button>

      <h1 className="select-none font-sans font-semibold text-sm">{title}</h1>

      {icon ? (
        <button
          type="button"
          onClick={handleClickAction}
          className="cursor-pointer"
        >
          {icon}
        </button>
      ) : (
        //아이콘 없으면 오른쪽 자리 채움
        <span className="block w-6 h-6" aria-hidden />
      )}
    </div>
  );
};

export default BackHeader;
