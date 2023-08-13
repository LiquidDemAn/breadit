"use client";
import { ChangeEvent, FC, useState } from "react";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { useApi } from "@/app/r/[slug]/post/[id]/components/CreateComment/useApi";
import { Props } from "@/app/r/[slug]/post/[id]/components/CreateComment/types";

const CreateComment: FC<Props> = ({ postId, replyToId }) => {
  const [text, setText] = useState("");

  const { isCreateCommentLoading, createCommentHandle } = useApi(setText);

  const onChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onSubmit = () => {
    createCommentHandle({ postId, text, replyToId });
  };

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="comment">Your comment</Label>
      <div className="mt-2">
        <Textarea
          id="comment"
          value={text}
          onChange={onChangeValue}
          rows={1}
          placeholder="What are your thoughts?"
        />
      </div>
      <div className="mt-2 flex justify-end">
        <Button
          onClick={onSubmit}
          isLoading={isCreateCommentLoading}
          disabled={text.length === 0}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreateComment;
