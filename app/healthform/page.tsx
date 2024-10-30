"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo2 from "../../assests/logo2.jpeg";
import { useForm } from 'react-hook-form';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from 'react'; 

const CreateUserForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  

  const [formData, setFormData] = useState({});

  const handleNavigation = () => {
    router.push('/chatbot?isNutrition=true'); 
  };

  const onSubmit = (data) => {
    setFormData(data);
    localStorage.setItem("formData",JSON.stringify(data || {}))
    handleNavigation();
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white">
      <div className="absolute top-4 left-4">
        <Image src={logo2} alt="Logo" width={200} height={100} />
      </div>
      <div className="bg-white flex flex-col justify-center items-center p-12 shadow-md rounded-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-purple-600 mb-8">Health Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div>
            <Input
              type="number"
              placeholder="Age"
              {...register("age", { required: "Age is required" })}
              className="w-full px-4 py-2 rounded-full border"
            />
            {errors.age && <p className="text-red-600">{errors.age.message}</p>}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Height (in feet)"
              {...register("height", { required: "Height is required" })}
              className="w-full px-4 py-2 rounded-full border"
            />
            {errors.height && <p className="text-red-600">{errors.height.message}</p>}
          </div>
          <div>
            <Input
              type="number"
              placeholder="Weight (in kg)"
              {...register("weight", { required: "Weight is required" })}
              className="w-full px-4 py-2 rounded-full border"
            />
            {errors.weight && <p className="text-red-600">{errors.weight.message}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700">Gender</Label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-purple-600"
                  {...register("gender", { required: "Gender is required" })}
                  value="male"
                />
                <span className="ml-2 text-gray-700">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-purple-600"
                  {...register("gender", { required: "Gender is required" })}
                  value="female"
                />
                <span className="ml-2 text-gray-700">Female</span>
              </label>
            </div>
            {errors.gender && <p className="text-red-600">{errors.gender.message}</p>}
          </div>
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
          >
            SUBMIT
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
