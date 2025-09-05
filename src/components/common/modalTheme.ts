// 아이콘 색상 매핑
import type { IconName } from "@/components/Icon/ChallengeIcon";

// 아이콘별 모달 테마
export const MODAL_THEME: Record<IconName, { bg: string; graphic: string }> = {
  book: {
    bg: "bg-gradient-to-b from-[#FF9CD4] from-25% to-[#FFEEF6] to-130%",
    graphic: "/images/card-book.webp",
  },
  water: {
    bg: "bg-gradient-to-b from-[#36E4E4] from-25% to-[#DEFFFF] to-130%",
    graphic: "/images/card-water.webp",
  },
  ball: {
    bg: "bg-gradient-to-b from-[#FF6C6C] from-25% to-[#FFCBCB] to-130%",
    graphic: "/images/card-ball.webp",
  },
  broom: {
    bg: "bg-gradient-to-b from-[#FBAB89] from-25% to-[#FFE2D6] to-130%",
    graphic: "/images/card-broom.webp",
  },
  bus: {
    bg: "bg-gradient-to-b from-[#77BBFF] from-25% to-[#EAF5FF] to-130%",
    graphic: "/images/card-bus.webp",
  },
  edit: {
    bg: "bg-gradient-to-b from-[#FFD45D] from-25% to-[#FFF5DA] to-130%",
    graphic: "/images/card-edit.webp",
  },
  music: {
    bg: "bg-gradient-to-b from-[#E28DFF] from-25% to-[#F4D5FF] to-130%",
    graphic: "/images/card-music.webp",
  },
  alarm: {
    bg: "bg-gradient-to-b from-[#8DED60] from-25% to-[#E1FFD3] to-130%",
    graphic: "/images/card-alarm.webp",
  },
  box: {
    bg: "bg-gradient-to-b from-[#D1D5DA] from-25% to-[#F4F4F4] to-130%",
    graphic: "/images/card-box.webp",
  },
  cook: {
    bg: "bg-gradient-to-b from-[#8DED60] from-25% to-[#E1FFD3] to-130%", //색 바뀌면 수정
    graphic: "/images/card-cook.webp",
  },
  moon: {
    bg: "bg-gradient-to-b from-[#A78FFF] from-25% to-[#E0D8FF] to-130%",
    graphic: "/images/card-moon.webp",
  },
  run: {
    bg: "bg-gradient-to-b from-[#94D0B0] from-25% to-[#DBFFEC] to-130%",
    graphic: "/images/card-run.webp",
  },
};
