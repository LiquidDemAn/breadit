"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const CloseModal = () => {
  const router = useRouter();

  const onBack = () => router.back();

  return (
    <Button
      variant="subtle"
      aria-label="close modal"
      className="h-6 w-6 p-0 rounded-md"
      onClick={onBack}
    >
      <X className="h-4 w-4" />
    </Button>
  );
};

export default CloseModal;
