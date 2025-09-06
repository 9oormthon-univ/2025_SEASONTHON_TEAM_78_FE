import { useEffect, useState } from "react";
import TopNavBar from "@/components/Navbar/TopNavBar";
import BottomNavBar from "@/components/Navbar/BottomNavBar";
import FeedCard from "@/components/FeedPage/FeedCard";
import CheerBottomSheet from "@/components/FeedPage/CheerBottomSheet";
import FeedDetailModal from "@/components/FeedPage/FeedDetailModal";
import { getFeed, type CertificationFeed, type Page } from "@/lib/api/feed";

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
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [detail, setDetail] = useState<DetailData | null>(null);

  const size = 10;
  const normalizeProfile = (url?: string | null) =>
    url && /^https?:\/\//.test(url) ? url : "/images/default-avatar.png";

  async function load(p = 0) {
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
  }

  useEffect(() => {
    load(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <TopNavBar title="피드" />

      <div className="flex flex-col items-center gap-[26px] py-6">
        {loading && items.length === 0 && (
          <p className="text-sm text-gray-500">불러오는 중…</p>
        )}

        {items.map((it) => (
          <FeedCard
            key={it.certificationId}
            imageUrl={it.imageUrl}
            totalCheers={it.totalReactions}
            onCheer={() => setCheerOpen(true)}
            profileUrl={normalizeProfile(it.authorPicture)}
            nickname={it.authorNickname}
            challengeTitle={it.title}
            content={it.content}
            onClickContent={() => {
              setDetail({
                imageUrl: it.imageUrl,
                profileUrl: normalizeProfile(it.authorPicture),
                nickname: it.authorNickname,
                title: it.title,
                content: it.content,
              });
              setDetailOpen(true);
            }}
          />
        ))}

        {!loading && items.length === 0 && (
          <p className="text-sm text-gray-500">표시할 피드가 없어요.</p>
        )}

        {!loading && hasMore && (
          <button
            type="button"
            onClick={() => load(page + 1)}
            className="rounded-full bg-black/80 px-4 py-2 text-sm font-semibold text-white"
          >
            더보기
          </button>
        )}

        {!loading && !hasMore && items.length > 0 && (
          <p className="text-sm text-gray-500">모든 피드를 확인했어요.</p>
        )}
      </div>

      <BottomNavBar />

      <CheerBottomSheet
        isOpen={isCheerOpen}
        onClose={() => setCheerOpen(false)}
        onSubmit={(stickerId: string) => {
          console.log("submit cheer", stickerId);
        }}
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
    </div>
  );
}

export default Feed;
