import TopNavBar from "@/components/Navbar/TopNavBar";
import BottomNavBar from "@/components/Navbar/BottomNavBar";
import ChallengeIcon from "@/components/Icon/ChallengeIcon";

type IconName = "ball" | "book" | "broom" | "bus" | "edit" | "water";

interface Item {
  id: number | string;
  icon: IconName;
  title: string;
  endDate: string; // 종료 날짜 (2025. 08. 29)
}

const ITEMS: Item[] = [
  { id: 1, icon: "book", title: "하루 책 한 권 읽기", endDate: "2025. 08. 29" },
  {
    id: 2,
    icon: "water",
    title: "물 500ml 이상 마시기",
    endDate: "2025. 08. 20",
  },
  { id: 3, icon: "broom", title: "청소하기", endDate: "2025. 08. 29" },
  { id: 4, icon: "bus", title: "버스 이용하기", endDate: "2025. 08. 20" },
  { id: 5, icon: "edit", title: "일기 쓰기", endDate: "2025. 08. 29" },
  { id: 6, icon: "ball", title: "운동하기", endDate: "2025. 08. 18" },
];

function CollectionPage() {
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
          <div
            key={it.id}
            className="w-full aspect-square rounded-[20px] bg-[#f4f7fb] px-2 py-3
                       flex flex-col items-center justify-center gap-1.5"
          >
            <ChallengeIcon
              name={it.icon}
              variant="color"
              className="w-[clamp(26px,6.5vw,32px)] h-[clamp(26px,6.5vw,32px)]"
              alt={`${it.icon} icon`}
            />
            <p className="w-[85%] text-sm font-bold text-center text-black break-words whitespace-normal">
              {it.title}
            </p>
            <p className="text-xs font-medium text-[#93979d]">{it.endDate}</p>
          </div>
        ))}
      </div>

      <BottomNavBar />
    </div>
  );
}

export default CollectionPage;
