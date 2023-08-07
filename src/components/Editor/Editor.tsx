"use client";
import React, { FC, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Props } from "./types";
import { useInitializeEditor } from "@/components/Editor/useInitializeEditor";
import { useCreatePostForm } from "@/components/Editor/useCreatePostForm";

const Editor: FC<Props> = ({ subredditId }) => {
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const { editorRef } = useInitializeEditor(titleRef);
  const { onSubmit, register } = useCreatePostForm({ subredditId, editorRef });

  const { ref: titleRefCallBack, ...rest } = register("title");

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
      <form id="subreddit-post-form" className="w-fit" onSubmit={onSubmit}>
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
          <div id="editor" className="min-h-[500px]" />
        </div>
      </form>
    </div>
  );
};

export default Editor;
