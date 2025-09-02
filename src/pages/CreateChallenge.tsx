import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavBar from "@/components/Navbar/TopNavBar";
import BottomNavBar from "@/components/Navbar/BottomNavBar";
import BoxButtonLarge from "@/components/common/BoxButtonLarge";

export default function CreateChallenge() {
  const navigate = useNavigate();
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");

  const handleBack = () => {
    navigate("/home");
  };

  const handleCreate = () => {
    // TODO: 챌린지 생성 API 호출
    console.log("챌린지 생성:", { challengeTitle, challengeDescription });
    navigate("/home");
  };

  const isFormValid = challengeTitle.trim().length > 0;

  return (
    <>
      <TopNavBar title="챌린지 추가" />
      <div className="flex flex-col min-h-screen px-6 py-8">
        <div className="flex-1 space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              챌린지 제목
            </label>
            <input
              id="title"
              type="text"
              value={challengeTitle}
              onChange={(e) => setChallengeTitle(e.target.value)}
              placeholder="예: 물 8잔 마시기"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              챌린지 설명 (선택사항)
            </label>
            <textarea
              id="description"
              value={challengeDescription}
              onChange={(e) => setChallengeDescription(e.target.value)}
              placeholder="챌린지에 대한 자세한 설명을 입력해주세요"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            />
          </div>
        </div>

        <div className="space-y-3 mt-8">
          <BoxButtonLarge onClick={handleCreate} disabled={!isFormValid}>
            챌린지 생성하기
          </BoxButtonLarge>
          <button
            type="button"
            onClick={handleBack}
            className="w-full py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
      <BottomNavBar />
    </>
  );
}
