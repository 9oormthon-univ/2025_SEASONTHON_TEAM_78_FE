import { useEffect, useState, useCallback } from "react";
import TopNavBar from "@/components/Navbar/TopNavBar";
import BottomNavBar from "@/components/Navbar/BottomNavBar";
import FeedCard from "@/components/FeedPage/FeedCard";
import CheerBottomSheet from "@/components/FeedPage/CheerBottomSheet";
import FeedDetailModal from "@/components/FeedPage/FeedDetailModal";
import { getFeed, type CertificationFeed, type Page } from "@/lib/api/feed";
import { postCheer } from "@/lib/api/cheer";
import Toast from "@/components/common/Toast";

type DetailData = {
  imageUrl: string;
  profileUrl: string;
  nickname: string;
  title: string;
  content: string;
};

function Feed() {
  const [items, setItems] = useState<CertificationFeed[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [isCheerOpen, setCheerOpen] = useState(false);
  const [selectedCertId, setSelectedCertId] = useState<number | null>(null);

  const [isDetailOpen, setDetailOpen] = useState(false);
  const [detail, setDetail] = useState<DetailData | null>(null);

  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
  };

  const size = 10;
  const load = useCallback(
    async (p = 0) => {
      if (loading) return;
      setLoading(true);
      try {
        const data: Page<CertificationFeed> = await getFeed(p, size);
        const next = data.pageContents ?? [];
        setItems((prev) => (p === 0 ? next : [...prev, ...next]));
        setHasMore(data.pageNumber + 1 < data.totalPages);
        setPage(data.pageNumber);
      } finally {
        setLoading(false);
      }
    },
    [loading, size]
  );

  useEffect(() => {
    load(0);
  }, [load]);

  const handleSubmitCheer = async (stickerId: number) => {
    if (selectedCertId == null) return;
    const map: Record<number, "CLAP" | "HEART" | "FIRE"> = {
      1: "CLAP",
      2: "HEART",
      3: "FIRE",
    };
    try {
      await postCheer(selectedCertId, map[stickerId]);
      showToast("응원 완료!");
    } catch {
      showToast("같은 이모티콘은 두 번 누를 수 없어요!");
    }
  };
  return (
    <div>
      <TopNavBar title="피드" />

      <div className="flex flex-col items-center gap-[26px] py-6">
        {items.map((it) => (
          <FeedCard
            key={it.certificationId}
            imageUrl={it.imageUrl}
            totalCheers={it.totalReactions}
            onCheer={() => {
              setSelectedCertId(it.certificationId);
              setCheerOpen(true);
            }}
            profileUrl={it.authorPicture}
            nickname={it.authorNickname}
            challengeTitle={it.title}
            content={it.content}
            onClickContent={() => {
              setDetail({
                imageUrl: it.imageUrl,
                profileUrl: it.authorPicture,
                nickname: it.authorNickname,
                title: it.title,
                content: it.content,
              });
              setDetailOpen(true);
            }}
          />
        ))}

        {!loading && hasMore && (
          <button
            type="button"
            onClick={() => load(page + 1)}
            className="rounded-full bg-black/80 px-4 py-2 text-sm font-semibold text-white"
          >
            더보기
          </button>
        )}
      </div>

      <BottomNavBar />

      <CheerBottomSheet
        isOpen={isCheerOpen}
        onClose={() => setCheerOpen(false)}
        onSubmit={handleSubmitCheer}
      />

      {detail && (
        <FeedDetailModal
          isOpen={isDetailOpen}
          onClose={() => setDetailOpen(false)}
          imageUrl={detail.imageUrl}
          profileUrl={detail.profileUrl}
          nickname={detail.nickname}
          challengeTitle={detail.title}
          content={detail.content}
        />
      )}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
}

export default Feed;
