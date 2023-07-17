"use client";
import { Button } from "@/components/ui/Button";
import { FC } from "react";
import { Props } from "@/components/SubscribeLeaveToggle/types";
import { useApi } from "@/components/SubscribeLeaveToggle/useApi";

const SubscribeLeaveToggle: FC<Props> = ({
  subredditId,
  subredditName,
  isSubscribed,
}) => {
  const { mutate, isLoading } = useApi({
    subredditName,
    subredditId,
    isSubscribed,
  });

  const onSubmit = () => {
    mutate();
  };

  return (
    <Button
      isLoading={isLoading}
      onClick={onSubmit}
      className="w-full mt-1 mb-4"
    >
      {isSubscribed ? "Leave community" : "Join to post"}
    </Button>
  );
};

export default SubscribeLeaveToggle;
