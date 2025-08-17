import { cookies } from "next/headers";
import { RoleType } from "../../../../../generated/prisma";
import prismaClient from "@/libs/services/prisma";
import { generateToken } from "@/libs/services/jwt";
import { getUserFromCookies } from "@/libs/helper";

export async function loginUser(
  _: any,
  args: {
    // jab hame kisi parameter ka use nhi krna hota to (_) under score se mark kr dete
    userCred: string;
    password: string;
  }
) {
  try {
    const cookiesStore = await cookies();
    const user = await prismaClient.user.findFirst({
      where: {
        OR: [
          {
            email: args?.userCred,
          },
          {
            username: args?.userCred,
          },
        ],
      },
    });
    if (!user) return false;
    if (user?.password == args.password) {
      // we will check if-else in case of finding a user, user not always present
      // set token
      const token = generateToken({ id: user.id });
      cookiesStore.set("Token", token);
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}

export async function logoutUser(){
  try {
    const userCookies = await cookies();
    userCookies.delete("Token");
    return true;
  } catch{
    return false;
  }
}

export async function createUser(
  _: any,
  args: {
    name: string;
    email: string;
    username: string;
    password: string;
    role: RoleType;
  }
) {
  // const userData = args
  try {
    const user = await getUserFromCookies();
    if (!user) return null;
    // console.log("user in create user resolvers ", user);
    if (user?.role != "admin") return null;

    const newUser = await prismaClient.user.create({
      data: args,
    });
    return newUser;
  } catch {
    return null;
  }
}

export async function updateUserRole(
  _: any,
  args: {
    userId: string;
    role: RoleType; // while update it should only be RoleType
  }
) {
  try {
    const user = await getUserFromCookies();
    if (user?.role != "admin") return false;
    const updateRole = await prismaClient.user.update({
      where: {
        id: args.userId,
      },
      data: {
        role: args.role,
      },
    });
    return true;
  } catch {
    return false;
  }
}

export async function updateUserProfile(
  _: any,
  args: {
    userId: string;
    name: string;
    email: string;
    username: string;
    avatar: string;
    role: RoleType;
  }
) {
  const dataToUpdate = {
    name: args?.name,
    email: args?.email,
    username: args?.username,
    role: args?.role,
  };
  try {
    const user = await getUserFromCookies();
    // console.log("user ", user);

    if (user?.role != "admin" && user?.id != args?.userId) return false;

    const updateProfile = await prismaClient.user.update({
      where: {
        id: args?.userId,
      },
      data: dataToUpdate,
    });
    return true;
  } catch (error: any) {
    console.log("error in updateProfile : ", error?.message);
    return false;
  }
}

export async function getAllUsers() {
  try {
    const users = await prismaClient.user.findMany({
      where: {
        role: {
          not: "admin",
        },
      },
    });
    return users;
  } catch(error : any) {
    console.log("error message in catch of get all users : : ", error?.message)
    return null;
  }
}


