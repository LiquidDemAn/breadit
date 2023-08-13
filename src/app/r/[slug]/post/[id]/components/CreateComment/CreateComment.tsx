"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { useApi } from "@/app/r/[slug]/post/[id]/components/CreateComment/useApi";
import { Props } from "@/app/r/[slug]/post/[id]/components/CreateComment/types";

const CreateComment: FC<Props> = ({
  postId,
  replyToId,
  onCancel,
  setIsReplaying,
}) => {
  const [text, setText] = useState("");

  const {
    isCreateCommentLoading,
    createCommentHandle,
    isCreateCommentSuccess,
  } = useApi(setText);

  const onChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onSubmit = () => {
    if (postId) {
      createCommentHandle({ postId, text, replyToId });
    }
  };

  useEffect(() => {
    if (replyToId && isCreateCommentSuccess && setIsReplaying) {
      setIsReplaying(false);
    }
  }, [isCreateCommentSuccess, replyToId, setIsReplaying]);

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
      <div className="mt-2 flex justify-end gap-2">
        {replyToId && (
          <Button tabIndex={-1} variant="subtle" onClick={onCancel}>
            Cancel
          </Button>
        )}
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
