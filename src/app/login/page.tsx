"use client";
import { LOGIN_USER } from "@/libs/gql/queries";
import gqlClient from "@/libs/services/graphql";
import { Button, Card, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { useState, useTransition } from "react";

export default function Page() {
  const [userCred, setUserCred] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    message?: string;
  }>({});
  const [isPending, startTransition] = useTransition();

  async function handleLogin() {
    setError({});

    startTransition(async () => {
      try {
        const data: { loginUser: boolean } = await gqlClient.request(
          LOGIN_USER,
          {
            userCred,
            password,
          }
        );
        console.log("data of user : ", data);
        if (data?.loginUser) {
          window.location.href = process.env.NEXT_PUBLIC_HOST_NAME as string;
          
        alert("user logged in");
        } else {
          setError({
            message: "Invaild Credential",
          });
        }
      } catch (error: any) {
        console.log("error in login page : ", error?.message);
        setError({
          message: "Error ",
        });
      }
    });
  }

  return (
    <main>
      <div className="h-screen flex justify-center items-center">
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="w-72 sm:w-100"
        >
          <div className="relative h-12 w-12 rounded-full mb-2">
            <Image
              fill
              src={"https://cdn-icons-png.flaticon.com/512/12474/12474074.png"}
              alt="image"
            />
          </div>
          <span className="text-gray-500 mb-2">
            (Guest? username : guest123, pass : 123)
          </span>
          <TextField.Root
            style={{
              height: 36,
            }}
            className="w-full mb-5"
            placeholder="Username"
            value={userCred}
            onChange={(e) => setUserCred(e.target.value)}
          />
          <TextField.Root
            style={{
              height: 36,
            }}
            className="w-full "
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            style={{
              width: "100%",
              margin: "20px 0",
            }}
            onClick={handleLogin}
            disabled={isPending}
          >
            <Text>{isPending ? "Logging..." : "Log In"}</Text>
          </Button>
          {error?.message && (
            <span className="text-red-500">{error?.message}</span>
          )}
        </Card>
      </div>
    </main>
  );
}