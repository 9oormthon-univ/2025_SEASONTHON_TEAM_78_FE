export type IconName =
  | "ball"
  | "book"
  | "broom"
  | "bus"
  | "edit"
  | "water"
  | "music"
  | "alarm"
  | "box"
  | "cook"
  | "moon"
  | "run";

export const ICON_LIGHT_COLORS: Record<IconName, string> = {
  ball: "bg-[#FF6C6C]/20",
  book: "bg-[#FF9CD4]/20",
  broom: "bg-[#FBAB89]/20",
  bus: "bg-[#77BBFF]/20",
  edit: "bg-[#FFD45D]/20",
  water: "bg-[#36E4E4]/20",
  music: "bg-[#E28DFF]/20",
  alarm: "bg-[#8DED60]/20",
  box: "bg-[#D1D5DA]/20",
  cook: "bg-[#FFBB4D]/20",
  moon: "bg-[#A78FFF]/20",
  run: "bg-[#94D0B0]/20",
};

export const ICON_COLORS: Record<IconName, string> = {
  ball: "bg-[#FF6C6C]",
  book: "bg-[#FF9CD4]",
  broom: "bg-[#FBAB89]",
  bus: "bg-[#77BBFF]",
  edit: "bg-[#FFD45D]",
  water: "bg-[#36E4E4]",
  music: "bg-[#E28DFF]",
  alarm: "bg-[#8DED60]",
  box: "bg-[#D1D5DA]",
  cook: "bg-[#FFBB4D]",
  moon: "bg-[#A78FFF]",
  run: "bg-[#94D0B0]",
};

// 진행률 바용 아이콘 색상 코드
export const ICON_COLOR_CODES: Record<
  IconName,
  { icon: string; background: string }
> = {
  ball: { icon: "#FF6C6C", background: "#FF6C6C20" },
  book: { icon: "#FF9CD4", background: "#FF9CD420" },
  broom: { icon: "#FBAB89", background: "#FBAB8920" },
  bus: { icon: "#77BBFF", background: "#77BBFF20" },
  edit: { icon: "#FFD45D", background: "#FFD45D20" },
  water: { icon: "#36E4E4", background: "#36E4E420" },
  music: { icon: "#E28DFF", background: "#E28DFF20" },
  alarm: { icon: "#8DED60", background: "#8DED6020" },
  box: { icon: "#D1D5DA", background: "#D1D5DA20" },
  cook: { icon: "#FFBB4D", background: "#FFBB4D20" },
  moon: { icon: "#A78FFF", background: "#A78FFF20" },
  run: { icon: "#94D0B0", background: "#94D0B020" },
};
