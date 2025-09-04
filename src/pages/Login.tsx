import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import KakaoLoginButton from '@/components/features/auth/KakaoLoginButton';

interface LocationState {
  from?: {
    pathname: string;
  };
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const qc = useQueryClient();
  const from = (location.state as LocationState)?.from?.pathname || '/';

  const handleSuccess = async (at: string) => {
    console.log('[login] accessToken:', at);

    await qc.invalidateQueries({ queryKey: ['me'] });
    navigate(from, { replace: true });
  };

  return (
    <div className="h-dvh pb-30 pt-15 bg-blue-50">
      {/* 상단 텍스트 */}
      <div className="flex flex-col items-center justify-center flex-shrink-0 pb-10 gap-3">
        <h1 className="text-4xl sm:text-5xl font-dunkel text-primary">
          Minimo
        </h1>
        <p className="text-xl sm:text-2xl font-semibold text-center px-4">
          작은 성공이 쌓이는 곳,
          <br />
          미니모에 오신 걸 환영해요!
        </p>
      </div>

      {/* 중앙에 위치한 이미지와 배경 */}
      <div className="flex-1 flex flex-col items-center justify-center py-4">
        <div className="relative">
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            w-90 h-90 rounded-full blur-2xl"
            style={{
              background:
                'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(59, 130, 246, 0.05) 100%)',
            }}
          ></div>
          <img
            src="/images/on-boarding.webp"
            alt="미니모 환영 이미지"
            className="relative z-10 w-65 h-65 sm:w-90 sm:h-90 object-cover"
          />
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-center pb-8 flex-shrink-0">
        <KakaoLoginButton onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
