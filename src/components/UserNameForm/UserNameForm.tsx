"use client";
import { FC } from "react";
import { Props } from "@/components/UserNameForm/types";
import { useForm } from "react-hook-form";
import {
  UsernameValidator,
  UsernameValidationType,
} from "@/lib/validators/usernameValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useApi } from "@/components/UserNameForm/useApi";

const UserNameForm: FC<Props> = ({ username }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameValidationType>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: username || "",
    },
  });

  const { mutate, isLoading } = useApi();

  return (
    <form onSubmit={handleSubmit((e) => mutate(e))}>
      <Card>
        <CardHeader>
          <CardTitle>Your username</CardTitle>
          <CardDescription>
            Please enter a display name you are comfortable with.
          </CardDescription>
          <CardContent>
            <div className="relative grid gap-1">
              <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center">
                <span className="text-sm text-zinc-400">u/</span>
              </div>

              <Label className="sr-only" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                size={32}
                {...register("name")}
                className="w-[400px] pl-6"
              />
              {errors?.name && (
                <p className="px-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button isLoading={isLoading}>Change name</Button>
          </CardFooter>
        </CardHeader>
      </Card>
    </form>
  );
};

export default UserNameForm;
