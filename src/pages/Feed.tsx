import { useState } from 'react';
import TopNavBar from '@/components/Navbar/TopNavBar';
import BottomNavBar from '@/components/Navbar/BottomNavBar';
import FeedCard from '@/components/FeedPage/FeedCard';
import CheerBottomSheet from '@/components/FeedPage/CheerBottomSheet';

function Feed() {
  const [isCheerOpen, setCheerOpen] = useState(false);

  const openCheer = () => {
    setCheerOpen(true);
    // setActivePostId(해당게시물id);
  };

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
          content="계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 어머니, 그리고 당신은 멀리 북간도에 계십니다..."
          onClickContent={() => console.log('open modal')}
        />
        <FeedCard
          imageUrl="/images/cat1.webp"
          totalCheers={99}
          onCheer={openCheer}
          profileUrl="/images/cat1.webp"
          nickname="미르미"
          challengeTitle="게시물 제목"
          content="계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 어머니, 그리고 당신은 멀리 북간도에 계십니다..."
          onClickContent={() => console.log('open modal')}
        />
      </div>

      <BottomNavBar />

      {/* 바텀시트 */}
      <CheerBottomSheet
        isOpen={isCheerOpen}
        onClose={() => setCheerOpen(false)}
        onSubmit={(stickerId: string) => {
          //응원하기 API 연동 (activePostId, stickerId)
          console.log('submit cheer', /* activePostId, */ stickerId);
        }}
      />
    </div>
  );
}

export default Feed;
