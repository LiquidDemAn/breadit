import { useForm } from "react-hook-form";
import {
  PostCreationRequest,
  PostValidator,
} from "@/lib/validators/postValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatPostFormProps } from "@/components/Editor/types";
import { useApi } from "@/components/Editor/useApi";
import { useEffect } from "react";
import { useCustomToast } from "@/hooks/useCustomToast";

export const useCreatePostForm = ({
  subredditId,
  editorRef,
}: CreatPostFormProps) => {
  const { createPostHandel, creatPostLoading } = useApi();
  const { postValidationToast } = useCustomToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      subredditId,
      title: "",
      content: null,
    },
  });

  const onSubmit = async ({ title }: PostCreationRequest) => {
    const blocks = await editorRef.current?.save();
    createPostHandel({ title, subredditId, content: blocks });
  };

  useEffect(() => {
    const errorsList = Object.entries(errors);
    if (errorsList.length) {
      for (const [_key, value] of errorsList) {
        postValidationToast(value.message as string);
      }
    }
  }, [errors, postValidationToast]);

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    creatPostLoading,
  };
};
