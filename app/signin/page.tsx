"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/validations/validationSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignInFormInputs {
  email: string;
  password: string;
}

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState<string>(""); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({
    resolver: yupResolver(signInSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log("hello", responseData);
      
      if (response.ok) {
        const accessToken = responseData.access_token;

        localStorage.setItem("access_token", accessToken);
        router.push("/homepage");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const handleNavigation = () => {
    router.push("/signup");
  };

  return (
    <div className="min-h-screen flex bg-yellow-100">

      <div className="w-1/2 bg-purple-600 flex flex-col justify-center items-start p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-purple-500 opacity-50 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-purple-700 opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <h1 className="text-4xl font-bold text-white mb-4 z-10">Welcome Back Health Mate AI</h1>
        <p className="text-xl text-white mb-8 z-10">
          To keep connected with us please
          <br />
          login with your personal info
        </p>
        <Button
          variant="outline"
          className="border-2 border-white text-purple-700 px-8 py-2 rounded-full z-10"
          onClick={handleNavigation}
        >
          SIGN UP
        </Button>
      </div>

      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <h2 className="text-3xl font-bold text-purple-600 mb-8">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full px-4 py-2 rounded-full border"
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full px-4 py-2 rounded-full border"
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
          </div>

          {errorMessage && <p className="text-red-600">{errorMessage}</p>}

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
          >
            SIGN IN
          </Button>
        </form>
      </div>
    </div>
  );
}
