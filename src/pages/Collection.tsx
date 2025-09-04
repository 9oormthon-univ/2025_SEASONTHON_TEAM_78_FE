import { useState } from 'react';
import TopNavBar from '@/components/Navbar/TopNavBar';
import BottomNavBar from '@/components/Navbar/BottomNavBar';
import CollectionCard from '@/components/CollectionPage/CollectionCard';
import CollectionCardFront from '@/components/CollectionPage/CollectionCardFront';
import CollectionCardBack from '@/components/CollectionPage/CollectionCardBack';

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
  const [isBack, setIsBack] = useState(false); //현재 뒷면 표시여부

  const openFront = (it: Item) => {
    setSelectedItem(it);
    setIsBack(false);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsBack(false); //다음에 열릴때 대비해서 앞면으로 초기화
  };

  const flip = () => setIsBack((prev) => !prev); //앞뒤전환

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
            onClick={() => {
              setSelectedItem(it);
              setIsBack(false);
            }}
          />
        ))}
      </div>

      {selectedItem && !isBack && (
        <CollectionCardFront
          isOpen={true}
          onClose={closeModal}
          title={selectedItem.title}
          iconName={selectedItem.icon}
          onFlip={flip}
        />
      )}
      {selectedItem && isBack && (
        <CollectionCardBack
          isOpen={true}
          onClose={closeModal}
          title={selectedItem.title}
          iconName={selectedItem.icon}
          description="오늘의 작은 성공을 기록했어요!"
          count1={3}
          count2={7}
          count3={12}
          onFlip={flip}
        />
      )}

      <BottomNavBar />
    </div>
  );
}

export default CollectionPage;
