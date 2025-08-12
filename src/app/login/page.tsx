'use client'
import { LOGIN_USER } from "@/libs/gql/queries";
import gqlClient from "@/libs/services/graphql";
import { Button, Card, Heading, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { useState, useTransition } from "react";

export default function Page() {
  const [userCred, setUserCred] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    message? : string
  }>({}); 
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleLogin(){
    setError({}); 
    // setLoading(true);
    
    startTransition( async () => {
      try {
      const data : { loginUser : boolean } = await gqlClient.request(LOGIN_USER, {
        userCred, 
        password
      })
      if(data?.loginUser){
        console.log("data of user : ", data)
        // window.location.href = process.env.HOST_NAME
        window.location.href = "http://localhost:3000"

      } else {
        setError({
          message : "Invaild Credential"
        })
      }
    } catch (error : any){
      console.log("eerroror : ", error?.message);
      setError({
          message : "Error "
        })
    }
    })
    

    // setLoading(false);
  }

  return (
    <main>
      <div className="h-screen flex justify-center items-center">
        <Card style={{
          display : "flex",
          flexDirection : "column",
          // gap : "20px", 
          alignItems : "center"
        }}>
          <div className="relative h-16 w-16 rounded-full ">
            <Image fill src={"https://cdn-icons-png.flaticon.com/512/12474/12474074.png"} alt="image" />
          </div>
          <TextField.Root
            style={{
              height: 36,
            }}
            className="w-96 mb-5"
            placeholder="Username"
            value={userCred}
            onChange={(e) => setUserCred(e.target.value)}
          />
          <TextField.Root
            style={{
              height: 36,
            }}
            className="w-96"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button style={{
            width : "100%",
            margin : "20px 0"
          }}
           onClick={handleLogin}
           disabled={isPending}
          >
            <Text>{isPending ? "Logging..." : "Log In"}</Text>
          </Button>
          {error?.message && <span className="text-red-500">{error?.message}</span>}
        </Card>
      </div>
    </main>
  );
}

// "use client";
// import gqlClient from "@/services/graphql";
// import { gql } from "graphql-request";
// import Link from "next/link";
// import { FormEvent, useState } from "react";

// const LOGIN_USER = gql`
//   mutation LoginUser($email: String!, $password: String!) {
//     loginUser(email: $email, password: $password)
//   }
// `;

// // query Query($userCred: String!, $password: String!) {
// //   loginUser(userCred: $userCred, password: $password)
// // }

// export default function page() {
//   const [formError, setFormError] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const uesrData = {
//     email,
//     password,
//   };

//   async function handleSumbit(e: FormEvent) {
//     setFormError("");
//     e.preventDefault();
//     if (email.trim().length == 0) {
//       setFormError("Email Can't be empty");
//       return;
//     } else if (password.trim().length == 0) {
//       setFormError("Password Can't be empty");
//       return;
//     }
//     try {
//       const user = await gqlClient.request(LOGIN_USER, uesrData);
//       if (user) {
//         alert('Logged In')
//         window.location.href = '/'
//       }
//       else alert("Failed")
//     } catch {
//       alert("Error")
//     }
//   }

//   return (
//     <div className="flex h-screen w-screen justify-center items-center">
//       <div className="auth rounded-xl  px-5 py-14 flex flex-col items-center gap-4 w-[450px] border">
//         <div className="flex flex-col items-center gap-7">
//           <div className="flex gap-2">

//             <span className="text-3xl font-bold">
//               Main App
//             </span>
//           </div>
//           <div className="flex flex-col items-center gap-1">
//             <span className="text-2xl font-semibold">Welcome Back</span>
//             <span className="text-gray-400">
//               Sign in to your account to continue
//             </span>
//           </div>
//         </div>
//         <form onSubmit={handleSumbit} className="flex flex-col gap-4 w-90">
//           <label htmlFor="email" className="flex flex-col gap-1">
//             Email Address
//             <input
//               id="email"
//               type="email"
//               name="email"
//               className="border border-[#3a3a3a] hover:border-[#535353] px-3 rounded-md outline-none transition-all duration-300 h-11"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </label>
//           <label htmlFor="password" className="flex flex-col gap-1">
//             Password
//             <input
//               id="password"
//               type="password"
//               name="password"
//               className="border border-[#3a3a3a] hover:border-[#535353] px-3 rounded-md outline-none transition-all duration-300 h-11"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </label>

//           <button
//             type="submit"
//             className="border border-[#3a3a3a] hover:border-[#535353] px-3 rounded-md outline-none transition-all duration-300 h-11"
//           >
//             Login
//           </button>

//         </form>
//         <span className="text-red-500">{formError}</span>
//       </div>
//     </div>
//   );
// }
