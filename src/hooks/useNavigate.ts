import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/_navbar';

const useNavigate = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(ROUTES.AUTO_PLAN);
    }
  };

  return { navigate, handleBack };
};

export default useNavigate;
