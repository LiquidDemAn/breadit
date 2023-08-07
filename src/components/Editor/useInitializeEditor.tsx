import { useCallback, useEffect, useRef, useState, RefObject } from "react";
import { ApiEndpoints } from "@/configs/constants";
import { uploadFiles } from "@/lib/uploadthing";
import EditorJS, { EditorConfig } from "@editorjs/editorjs";

export const useInitializeEditor = (
  titleRef?: RefObject<HTMLTextAreaElement>,
) => {
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState(false);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    if (titleRef) {
      setTimeout(() => {
        titleRef.current?.focus();
      }, 0);
    }

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  return {
    editorRef: ref,
  };
};
