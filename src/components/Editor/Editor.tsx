"use client";
import React, {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import {
  PostCreationRequest,
  PostValidator,
} from "@/components/Editor/postValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Props } from "./types";
import { EditorConfig } from "@editorjs/editorjs";
import type EditorJS from "@editorjs/editorjs";
import { ApiEndpoints } from "@/configs/constants";
import { uploadFiles } from "@/lib/uploadthing";
import { useCustomToast } from "@/hooks/useCustomToast";
import { useApi } from "@/components/Editor/useApi";

const Editor: FC<Props> = ({ subredditId }) => {
  const ref = useRef<EditorJS>();
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { postValidationToast } = useCustomToast();
  const createPostHandel = useApi();

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

  const { ref: titleRefCallBack, ...rest } = register("title");

  const initializeEditor = useCallback(async () => {
    const EditorJs = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJs({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: {
          blocks: [],
        },
        tools: {
          header: Header,
          list: List,
          code: Code,
          inline: InlineCode,
          table: Table,
          embed: Embed,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: ApiEndpoints.LINK,
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles([file], "imageUploader");

                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
        },
      } as EditorConfig);
    }
  }, []);

  const onSubmit = async ({ title }: PostCreationRequest) => {
    const blocks = await ref.current?.save();
    createPostHandel({ title, subredditId, content: blocks });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const errorsList = Object.entries(errors);
    if (errorsList.length) {
      for (const [_key, value] of errorsList) {
        postValidationToast(value.message as string);
      }
    }
  }, [errors]);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    setTimeout(() => {
      titleRef.current?.focus();
    }, 0);

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
      <form
        id="subreddit-post-form"
        className="w-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
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
