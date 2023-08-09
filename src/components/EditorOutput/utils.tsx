import Image from "next/image";

const CustomImageRenderer = ({ data }: any) => {
  const src = data.file.url;

  return (
    <div className="relative w-full min-h-[15rem]">
      <Image src={src} alt="image" className="object-contain" fill />
    </div>
  );
};

const CustomCodeRenderer = ({ data }: any) => {
  return (
    <pre className="bg-gray-800 rounded-md p-4">
      <code className="text-gray-100 text-sm">{data.content}</code>
    </pre>
  );
};

export const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

export const outputStyles = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};
