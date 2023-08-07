import { MutableRefObject } from "react";
import EditorJS from "@editorjs/editorjs";

export type Props = {
  subredditId: string;
};

export type CreatPostFormProps = {
  subredditId: string;
  editorRef: MutableRefObject<EditorJS | undefined>;
};
