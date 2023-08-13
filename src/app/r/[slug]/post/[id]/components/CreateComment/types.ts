export type Props = {
  postId: string | null;
  replyToId?: string;
  onCancel?: () => void;
  setIsReplaying?: (value: boolean) => void;
};
