import { cookies } from "next/headers";
import { verifyToken } from "./services/jwt";
import prismaClient from "./services/prisma";

export async function getUserFromCookies() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("Token")?.value;
    // console.log("Token ", token);
    if (!token) return null;
    const data = verifyToken(token);
    // console.log("data : ", data);

    if (!data?.id) return null;

    const user = await prismaClient.user.findUnique({
      where: {
        id: data?.id,
      },
      omit: {
        password: true,
      },
    });
    console.log("user : ", user);

    if (!user) return null;
    else return user;
  } catch (error: any) {
    console.log("error : ", error?.message);
    return null;
  }
}