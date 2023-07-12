import { useRouter } from "next/navigation";

export const useRouterMethods = () => {
  const router = useRouter();
  const onBack = () => {
    router.back();
  };

  return {
    onBack,
  };
};
