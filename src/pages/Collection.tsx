import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TopNavBar from "@/components/Navbar/TopNavBar";
import BottomNavBar from "@/components/Navbar/BottomNavBar";
import CollectionCard from "@/components/CollectionPage/CollectionCard";
import CollectionCardFront from "@/components/CollectionPage/CollectionCardFront";
import CollectionCardBack from "@/components/CollectionPage/CollectionCardBack";
import type { IconName } from "@/components/Icon/ChallengeIcon";
import {
  getCompletedChallenges,
  getCollectionDetail,
  toReactionCounts,
  type CompletedChallengeRaw,
} from "@/lib/api/collection";

interface Item {
  id: number;
  icon: IconName;
  title: string;
  endDate: string;
}

function formatDateDot(dateStr: string) {
  // "2025-09-06" -> "2025. 09. 06"
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}. ${m}. ${day}`;
}

function toItem(raw: CompletedChallengeRaw): Item {
  return {
    id: raw.id,
    icon: raw.challengeIcon,
    title: raw.title,
    endDate: formatDateDot(raw.endDate),
  };
}

function CollectionPage() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isBack, setIsBack] = useState(false); //현재 뒷면 표시여부

  //완료목록
  const { data, isLoading, isError } = useQuery({
    queryKey: ["completedChallenges"],
    queryFn: () => getCompletedChallenges(),
  });

  const items: Item[] = (data ?? []).map(toItem);

  const closeModal = () => {
    setSelectedItem(null);
    setIsBack(false); //다음에 열릴때 대비해서 앞면으로 초기화
  };

  const flip = () => setIsBack((prev) => !prev); //앞뒤전환

  //뒷면열렸을때 상세 api호출
  const { data: detail, isLoading: isDetailLoading } = useQuery({
    queryKey: ["collectionDetail", selectedItem?.id],
    queryFn: () => getCollectionDetail(selectedItem!.id),
    enabled: !!selectedItem && isBack, // 앞면일 땐 비활성
  });

  const counts = toReactionCounts(detail);

  return (
    <div className="w-full max-w-[480px] mx-auto">
      <TopNavBar title="컬렉션" />

      <div className="px-[clamp(16px,4.2vw,20px)] py-4">
        <p className="text-sm font-semibold text-left text-black">
          카드 컬렉션
        </p>
      </div>

      {isLoading && <div className="px-4 pb-4 text-gray-500">불러오는 중…</div>}
      {isError && (
        <div className="px-4 pb-4 text-red-500">
          데이터를 불러오지 못했어요.
        </div>
      )}
      {!isLoading && !isError && items.length === 0 && (
        <div className="px-4 pb-4 text-gray-500">
          완료된 챌린지가 아직 없어요.
        </div>
      )}

      <div
        className="
          grid grid-cols-3
          px-[clamp(16px,4.2vw,20px)]
          gap-x-[clamp(8px,2.6vw,10px)]
          gap-y-[clamp(8px,2.6vw,10px)]
          pb-4
        "
      >
        {items.map((it) => (
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
          description={
            isDetailLoading
              ? "불러오는 중..."
              : (detail?.content ?? "설명이 없습니다.")
          }
          count1={counts.clap}
          count2={counts.heart}
          count3={counts.fire}
          onFlip={flip}
        />
      )}

      <BottomNavBar />
    </div>
  );
}

export default CollectionPage;
