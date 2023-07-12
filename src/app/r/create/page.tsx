"use client";
import React, { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRouterMethods } from "@/hooks/useRouterMethods";
import { useApi } from "@/app/r/create/useApi";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const { onBack } = useRouterMethods();
  const { createSubredditQuery } = useApi();
  const { mutate, isLoading } = createSubredditQuery;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onCreateSubreddit = () => {
    mutate({ name: inputValue });
  };

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a community</h1>
        </div>
        <hr className="bg-zinc-500 h-px" />

        <div>
          <label form="nameInput" className="text-lg font-medium">
            Name
          </label>
          <p className="text-xs pb-2">
            Community names including capitalization cannot be changed
          </p>

          <div className="relative">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
              r/
            </p>

            <Input
              id="nameInput"
              value={inputValue}
              onChange={onInputChange}
              className="pl-6"
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button onClick={onBack} variant="subtle">
              Cancel
            </Button>
            <Button
              onClick={onCreateSubreddit}
              isLoading={isLoading}
              disabled={inputValue.length < 3}
            >
              Create Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
