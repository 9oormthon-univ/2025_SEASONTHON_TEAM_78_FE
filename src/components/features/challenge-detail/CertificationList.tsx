import FeedCard from "@/components/FeedPage/FeedCard";
import { useMe } from "@/hooks/useMe";

interface Reaction {
  emojiType: string;
  count: number;
}

interface Certification {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
  createdAt: string;
  reactions: Reaction[];
}

interface CertificationListProps {
  certifications: Certification[];
  challengeTitle: string;
}

export default function CertificationList({
  certifications,
  challengeTitle,
}: CertificationListProps) {
  const { data: userData } = useMe();

  if (certifications.length === 0) {
    return null;
  }

  const handleCheer = (certificationId: number) => {
    // TODO: 응원하기 API 호출
    console.log("응원하기:", certificationId);
  };

  const handleContentClick = (certificationId: number) => {
    // TODO: 인증 상세 모달 열기
    console.log("인증 상세:", certificationId);
  };

  // reactions에서 총 응원 수 계산
  const getTotalCheers = (reactions: Reaction[]) => {
    return reactions.reduce((total, reaction) => total + reaction.count, 0);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">인증 목록</h3>
      <div className="grid grid-cols-1 gap-4">
        {certifications
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((certification) => (
            <FeedCard
              key={certification.id}
              imageUrl={certification.imageUrl}
              totalCheers={getTotalCheers(certification.reactions)}
              onCheer={() => handleCheer(certification.id)}
              profileUrl="/images/default-profile.png" // TODO: 사용자 프로필 이미지 API 연결
              nickname={userData?.nickname || "익명"}
              challengeTitle={challengeTitle}
              content={certification.content}
              onClickContent={() => handleContentClick(certification.id)}
              className="w-full h-[343px]"
            />
          ))}
      </div>
    </div>
  );
}
