import { useNavigate } from "react-router-dom";

export default function CreateChallengeButton() {
  const navigate = useNavigate();

  const handleCreateChallenge = () => {
    navigate("/create-challenge");
  };

  return (
    <div className="flex justify-end px-10 py-4">
      <button
        type="button"
        onClick={handleCreateChallenge}
        className="w-12 h-12 rounded-full bg-gradient-to-b from-[#4672FF] to-[#8DB7FF] hover:from-[#2B5BFF] hover:to-[#6B9FFF] 
          text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
      >
        <svg className="w-5 h-5" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
