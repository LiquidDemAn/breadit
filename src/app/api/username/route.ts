import { NextRequest } from "next/server";
import { getAuthSession } from "@/configs/authOptions";
import { UsernameValidator } from "@/lib/validators/usernameValidation";
import { db } from "@/lib/db";
import { z } from "zod";

export const PATCH = async (req: NextRequest) => {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { name: username } = UsernameValidator.parse(body);

    const isUserNameExist = !!(await db.user.findFirst({
      where: { username },
    }));

    if (isUserNameExist) {
      return new Response("Username is taken", { status: 409 });
    }

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed.", { status: 422 });
    }
    return new Response("Could not update username. Please try again later.", {
      status: 500,
    });
  }
};
