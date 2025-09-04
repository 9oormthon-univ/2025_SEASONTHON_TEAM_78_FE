import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BackNavBar from '@/components/Navbar/BackNavBar';
import ChallengeIcon from '@/components/Icon/ChallengeIcon';
import { type IconName, ICON_LIGHT_COLORS } from '@/types/challenge';

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  duration: number;
  createdAt: string;
  status: 'pending' | 'done';
  completedDays?: number;
  totalDays?: number;
}

export default function ChallengeDetail() {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    if (id) {
      // 로컬 스토리지에서 챌린지 찾기
      const challenges = JSON.parse(localStorage.getItem('challenges') || '[]');
      const foundChallenge = challenges.find((c: Challenge) => c.id === id);
      setChallenge(foundChallenge || null);
    }
  }, [id]);

  if (!challenge) {
    return (
      <div className="flex flex-col h-screen">
        <BackNavBar title="챌린지 상세" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-lg font-medium">챌린지를 찾을 수 없습니다</div>
            <div className="text-sm mt-2">잘못된 접근입니다.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <BackNavBar title="챌린지 상세" />
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-6">
          {/* 챌린지 헤더 */}
          <div className="text-center">
            <div
              className={`w-20 h-20 ${ICON_LIGHT_COLORS[challenge.icon]} rounded-3xl flex items-center justify-center shadow-lg mx-auto mb-4`}
            >
              <ChallengeIcon name={challenge.icon} variant="color" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {challenge.title}
            </h1>
            <p className="text-gray-600">{challenge.description}</p>
          </div>

          {/* 챌린지 정보 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">상태</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    challenge.status === 'done'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {challenge.status === 'done' ? '완료' : '진행중'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">기간</span>
                <span className="font-medium">{challenge.duration}일</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">시작일</span>
                <span className="font-medium">
                  {new Date(challenge.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* 진행률 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">진행률</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {challenge.completedDays || 0}/
                {challenge.totalDays || challenge.duration}
              </div>
              <div className="text-gray-600">완료한 일수</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
