import { useState } from 'react';
import TopNavBar from '@/components/Navbar/TopNavBar';
import BottomNavBar from '@/components/Navbar/BottomNavBar';
import CollectionCard from '@/components/CollectionPage/CollectionCard';
import CardModalShell from '@/components/common/CardModalShell'; //모달 틀 확인

type IconName = 'ball' | 'book' | 'broom' | 'bus' | 'edit' | 'water';

interface Item {
  id: number | string;
  icon: IconName;
  title: string;
  endDate: string;
}

const ITEMS: Item[] = [
  { id: 1, icon: 'book', title: '하루 책 한 권 읽기', endDate: '2025. 08. 29' },
  {
    id: 2,
    icon: 'water',
    title: '물 500ml 이상 마시기',
    endDate: '2025. 08. 20',
  },
  { id: 3, icon: 'broom', title: '청소하기', endDate: '2025. 08. 29' },
  { id: 4, icon: 'bus', title: '버스 이용하기', endDate: '2025. 08. 20' },
  { id: 5, icon: 'edit', title: '일기 쓰기', endDate: '2025. 08. 29' },
];

function CollectionPage() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="w-full max-w-[480px] mx-auto">
      <TopNavBar title="컬렉션" />

      <div className="px-[clamp(16px,4.2vw,20px)] py-4">
        <p className="text-sm font-semibold text-left text-black">
          카드 컬렉션
        </p>
      </div>

      <div
        className="
          grid grid-cols-3
          px-[clamp(16px,4.2vw,20px)]
          gap-x-[clamp(8px,2.6vw,10px)]
          gap-y-[clamp(8px,2.6vw,10px)]
          pb-4
        "
      >
        {ITEMS.map((it) => (
          <CollectionCard
            key={it.id}
            icon={it.icon}
            title={it.title}
            endDate={it.endDate}
            onClick={() => setSelectedItem(it)} // 카드 자체 클릭 → 모달 열기
          />
        ))}
      </div>

      {selectedItem && (
        <CardModalShell
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)} // 닫기 버튼/오버레이 → 모달 닫기
          title={selectedItem.title} // 모달 헤더 제목
          variant="themed" // 아이콘 색 배경 적용
          iconName={selectedItem.icon}
        >
          {/* 모달 안에 들어갈 내용은 여기에서 작성 */}
          <div className="p-4">
            <p className="text-sm text-[#2a2c2e]">
              종료일: {selectedItem.endDate}
            </p>
            <p className="mt-2 text-base">
              여기에 카드 상세 내용이 들어갑니다.
            </p>
          </div>
        </CardModalShell>
      )}

      <BottomNavBar />
    </div>
  );
}

export default CollectionPage;
