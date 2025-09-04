import { useState } from 'react';
import TopNavBar from '@/components/Navbar/TopNavBar';
import BottomNavBar from '@/components/Navbar/BottomNavBar';
import FeedCard from '@/components/FeedPage/FeedCard';
import CheerBottomSheet from '@/components/FeedPage/CheerBottomSheet';
import FeedDetailModal from '@/components/FeedPage/FeedDetailModal';

type DetailData = {
  imageUrl: string;
  profileUrl: string;
  nickname: string;
  challengeTitle: string;
  content: string;
};

function Feed() {
  const [isCheerOpen, setCheerOpen] = useState(false);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [detail, setDetail] = useState<DetailData | null>(null);

  const openCheer = () => setCheerOpen(true);

  function openDetail(data: DetailData) {
    setDetail(data);
    setDetailOpen(true);
  }

  return (
    <div>
      <TopNavBar title="피드" />

      <div className="flex flex-col items-center gap-[26px] py-6">
        <FeedCard
          imageUrl="/images/cat1.webp"
          totalCheers={99}
          onCheer={openCheer}
          profileUrl="/images/cat1.webp"
          nickname="미르미"
          challengeTitle="게시물 제목"
          content="계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 그러나, 겨울이 지나고 나의 어머님, 그리고 당신은 멀리 북간도에 계십니다. 별 하나에 추억과 별 하나에 사랑과 별 하나에 쓸쓸함과 별 하나에 동경과 별 하나에 시와 별 하나에 어머니, 어머니, 어머님, 나는 별 하나에 아름다운 말 한 마디씩 불러 봅니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 그러나, 겨울이 지나고 나의"
          onClickContent={() =>
            openDetail({
              imageUrl: '/images/cat1.webp',
              profileUrl: '/images/cat1.webp',
              nickname: '미르미',
              challengeTitle: '게시물 제목',
              content:
                '계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 그러나, 겨울이 지나고 나의 어머님, 그리고 당신은 멀리 북간도에 계십니다. 별 하나에 추억과 별 하나에 사랑과 별 하나에 쓸쓸함과 별 하나에 동경과 별 하나에 시와 별 하나에 어머니, 어머니, 어머님, 나는 별 하나에 아름다운 말 한 마디씩 불러 봅니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 그러나, 겨울이 지나고 나의',
            })
          }
        />

        <FeedCard
          imageUrl="/images/cat1.webp"
          totalCheers={99}
          onCheer={openCheer}
          profileUrl="/images/cat1.webp"
          nickname="미르미"
          challengeTitle="게시물 제목"
          content="계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 그러나, 겨울이 지나고 나의 어머님, 그리고 당신은 멀리 북간도에 계십니다. 별 하나에 추억과 별 하나에 사랑과 별 하나에 쓸쓸함과 별 하나에 동경과 별 하나에 시와 별 하나에 어머니, 어머니, 어머님, 나는 별 하나에 아름다운 말 한 마디씩 불러 봅니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 그러나, 겨울이 지나고 나의"
          onClickContent={() =>
            openDetail({
              imageUrl: '/images/cat1.webp',
              profileUrl: '/images/cat1.webp',
              nickname: '미르미',
              challengeTitle: '게시물 제목',
              content:
                '계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 그러나, 겨울이 지나고 나의 어머님, 그리고 당신은 멀리 북간도에 계십니다. 별 하나에 추억과 별 하나에 사랑과 별 하나에 쓸쓸함과 별 하나에 동경과 별 하나에 시와 별 하나에 어머니, 어머니, 어머님, 나는 별 하나에 아름다운 말 한 마디씩 불러 봅니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 그러나, 겨울이 지나고 나의',
            })
          }
        />
      </div>

      <BottomNavBar />

      {/* 응원 바텀시트 */}
      <CheerBottomSheet
        isOpen={isCheerOpen}
        onClose={() => setCheerOpen(false)}
        onSubmit={(stickerId: string) => {
          console.log('submit cheer', stickerId);
        }}
      />

      {/* 상세 모달 */}
      {detail && (
        <FeedDetailModal
          isOpen={isDetailOpen}
          onClose={() => setDetailOpen(false)}
          imageUrl={detail.imageUrl}
          profileUrl={detail.profileUrl}
          nickname={detail.nickname}
          challengeTitle={detail.challengeTitle}
          content={detail.content}
        />
      )}
    </div>
  );
}

export default Feed;
