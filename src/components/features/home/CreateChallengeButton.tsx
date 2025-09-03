import { useNavigate } from "react-router-dom";

export default function CreateChallengeButton() {
  const navigate = useNavigate();

  const handleCreateChallenge = () => {
    navigate("/create-challenge");
  };

  return (
    <div className="absolute bottom-30 right-10">
      <button
        type="button"
        onClick={handleCreateChallenge}
        className="w-12 h-12 rounded-full bg-gradient-to-b 
        from-[#2B5BFF] to-[#6B9FFF] hover:from-[#4672FF] hover:to-[#8DB7FF]
        text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
      >
        <svg className="w-5 h-5" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
