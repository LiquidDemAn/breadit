"use client";
import React, { FC } from "react";
import dynamic from "next/dynamic";
import { Props } from "./types";
import { outputStyles, renderers } from "@/components/EditorOutput/utils";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false },
);

const EditorOutput: FC<Props> = ({ content }) => {
  return (
    <Output
      data={content}
      style={outputStyles}
      className="text-sm"
      renderers={renderers}
    />
  );
};

export default EditorOutput;
