"use client";
import { FC, PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/configs/queryClient";
import {SessionProvider} from "next-auth/react";

const Providers: FC<PropsWithChildren> = ({ children }) => {

  return (
      <SessionProvider>
         <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </SessionProvider>
  );
};

export default Providers;
