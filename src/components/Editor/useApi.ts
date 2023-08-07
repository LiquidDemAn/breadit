import { useMutation } from "@tanstack/react-query";
import { PostCreationRequest } from "@/components/Editor/postValidator";
import axios from "axios";
import { ApiEndpoints } from "@/configs/constants";
import { useCustomToast } from "@/hooks/useCustomToast";
import { usePathname, useRouter } from "next/navigation";

export const useApi = () => {
  const { creatPostErrorToast, successCretePostToast } = useCustomToast();
  const pathname = usePathname();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (payload: PostCreationRequest) => {
      const { data } = await axios.post(ApiEndpoints.CREATE_POST, payload);
      return data;
    },
    onError: () => {
      creatPostErrorToast();
    },
    onSuccess: () => {
      const newPathname = pathname.split("/").slice(0, -1).join("/");
      router.push(newPathname);
      router.refresh();
      successCretePostToast();
    },
  });

  return mutate;
};
