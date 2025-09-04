import { useMe } from '@/hooks/useMe';
import { useNavigate } from 'react-router-dom';
import ProfileSelectContent from '@/components/features/profile-select/ProfileSelectContent';

interface ImageOption {
  id: number;
  src: string;
  alt: string;
  imgClass?: string;
}

export default function ProfileSelect() {
  const { data } = useMe();
  const navigate = useNavigate();

  const nickname = data?.properties?.nickname ?? '';

  const handleNext = (selectedImage: ImageOption | null) => {
    if (selectedImage !== null) {
      navigate('/home');
    }
  };

  return <ProfileSelectContent nickname={nickname} onNext={handleNext} />;
}
