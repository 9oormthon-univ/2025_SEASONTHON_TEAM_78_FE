import TopNavBar from '@/components/Navbar/TopNavBar';
import BottomNavBar from '@/components/Navbar/BottomNavBar';
import FeedCard from '@/components/FeedPage/FeedCard';

function Feed() {
  return (
    <div>
      <TopNavBar title="피드" />
      <FeedCard
        imageUrl="/images/cat1.webp"
        totalCheers={99}
        onCheer={() => console.log('cheer!')}
        profileUrl="/images/cat1.webp"
        nickname="미르미"
        challengeTitle="게시물 제목"
        content="계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 어머니, 그리고 당신은 멀리 북간도에 계십니다..."
        onClickContent={() => console.log('open modal')}
      />
      <BottomNavBar />
    </div>
  );
}

export default Feed;
