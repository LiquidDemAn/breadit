"use client";
import React, { useCallback, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { useApi } from "@/components/SearchBar/useApi";
import { useRouter } from "next/navigation";
import { PathsEnum } from "@/configs/constants";
import { Users } from "lucide-react";
import debounce from "lodash/debounce";

const SearchBar = () => {
  const router = useRouter();

  const [value, setValue] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const { isFetched, queryResult, refetch } = useApi(value);

  const request = debounce(() => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
  }, [request]);

  const onInputChange = (text: string) => {
    setValue(text);
    debounceRequest();

    if (isSelected) {
      setIsSelected(false);
    }
  };

  const onSelectItem = (item: string) => {
    setValue(item);
    setIsSelected(true);

    router.refresh();
    router.push(`${PathsEnum.SUBREDDIT}/${item}`);
  };
  return (
    <Command className="relative rounded-lg border max-w-lg z-50 overflow-visible ">
      <CommandInput
        value={value}
        isLoading={false}
        onValueChange={onInputChange}
        placeholder="Search communities..."
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
      />

      {!isSelected && value.length > 0 ? (
        <CommandList className="absolute bg-white top-full inset-x-1 shadow rounded-b-md">
          {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
          {queryResult?.length ?? 0 > 0 ? (
            <CommandGroup heading="Commiunities">
              {queryResult?.map((subreddit) => (
                <CommandItem
                  key={subreddit.id}
                  value={subreddit.name}
                  onSelect={onSelectItem}
                  className="cursor-pointer"
                >
                  <Users className="mr-2 h-4 w-4" />
                  r/{subreddit.name}
                </CommandItem>
              ))}
            </CommandGroup>
          ) : (
            <></>
          )}
        </CommandList>
      ) : null}
    </Command>
  );
};

export default SearchBar;
