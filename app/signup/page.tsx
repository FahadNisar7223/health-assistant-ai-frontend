"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios"; 
import { useState } from "react"; 
import { signUpSchema } from "../../validations/validationSchema" 
import { useRouter } from 'next/navigation'

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema), 
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();


  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await axios.post("http://localhost:8000/signup", data);
  
      if (response.status === 200) {
        setSuccessMessage("Signup successful! You can now log in.");
        setServerError(null); 
        reset();
         setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (error: any) {
      if (error.response) {
        setServerError(error.response.data.detail || "Signup failed. Please try again.");
      } else {
        setServerError("An unexpected error occurred. Please try again.");
      }
      setSuccessMessage(null); 
    }
  };
  
  const handleNavigation = () => {
    router.push('/signin'); 
  };

  return (
    <div className="min-h-screen flex bg-yellow-100">
    
      <div className="w-1/2 bg-purple-600 flex flex-col justify-center items-start p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-purple-500 opacity-50 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-purple-700 opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <h1 className="text-4xl font-bold text-white mb-4 z-10">Join the Health Mate AI</h1>
        <p className="text-xl text-white mb-8 z-10">
        Create your account to access personalized health insights, doctor recommendations, and customized nutrition plans. 
        </p>
        <Button variant="outline" className="border-2 border-white text-purple-700 px-8 py-2 rounded-full z-10" onClick={handleNavigation}>
          SIGN IN
        </Button>
      </div>

      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <h2 className="text-3xl font-bold text-purple-600 mb-8">Create Account</h2>

        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

        {serverError && <p className="text-red-600 mb-4">{serverError}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Username"
              {...register("username")}
              className="w-full px-4 py-2 rounded-full border"
            />
            {errors.username && <p className="text-red-600">{errors.username.message}</p>}
          </div>
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
          <div>
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="w-full px-4 py-2 rounded-full border"
            />
            {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
            SIGN UP
          </Button>
        </form>
      </div>
    </div>
  );
}
