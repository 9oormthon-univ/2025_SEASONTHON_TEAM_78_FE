//아이콘 - 색상 맵핑
import type { IconName } from '@/components/Icon/ChallengeIcon';

// 아이콘 종류별 모달 색상 테마
export const MODAL_THEME: Record<IconName, { bg: string }> = {
  book: {
    bg: 'bg-gradient-to-b from-[#FF9CD4] from-25% to-[#FFEEF6] to-94%',
  },
  water: {
    bg: 'bg-gradient-to-b from-[#36E4E4] from-25% to-[#E5FFFF] to-94%',
  },
  ball: {
    bg: 'bg-gradient-to-b from-[#D0EA23] from-25% to-[#FCFFE5] to-94%',
  },
  broom: {
    bg: 'bg-gradient-to-b from-[#FF9A6F] from-25% to-[#FFF2EC] to-94%',
  },
  bus: {
    bg: 'bg-gradient-to-b from-[#77BBFF] from-25% to-[#EAF5FF] to-94%',
  },
  edit: {
    bg: 'bg-gradient-to-b from-[#FFD45D] from-25% to-[#FFF9E9] to-94%',
  },
};
