"use client";
import React, { FC, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Props } from "./types";
import { useInitializeEditor } from "@/components/Editor/useInitializeEditor";
import { useCreatePostForm } from "@/components/Editor/useCreatePostForm";
import { Button } from "@/components/ui/Button";
import {useSession} from "next-auth/react";

const Editor: FC<Props> = ({ subredditId }) => {
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const { editorRef } = useInitializeEditor(titleRef);
  const { onSubmit, register, creatPostLoading } = useCreatePostForm({
    subredditId,
    editorRef,
  });

  const {data: session} = useSession()

  console.log(session);

  const { ref: titleRefCallBack, ...rest } = register("title");

  return (
    <div className="w-full p-8 bg-zinc-50 rounded-lg border border-zinc-200">
      <form id="subreddit-post-form" onSubmit={onSubmit}>
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            ref={(event) => {
              titleRefCallBack(event);
              // @ts-ignore
              titleRef.current = event;
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[400px] p-0" />
        </div>

        <div className="w-full flex justify-end">
          <Button
            type="submit"
            className="w-full"
            form="subreddit-post-form"
            disabled={creatPostLoading}
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Editor;
