import { User } from "next-auth";

export type Props = {
  user: Pick<User, "name" | "image" | "email">;
};
