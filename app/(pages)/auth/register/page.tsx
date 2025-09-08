"use client";
import { Button } from "@/app/(components)/button/button-component";
import { Input } from "@/app/(components)/input/input-component";
import {
  RegisterForm,
  RegisterFormSchema,
} from "@/app/lib/types/schema/register-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(RegisterFormSchema),
  });
  const router = useRouter();
  const [apiError, setApiError] = React.useState<string | null>(null);
  
  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setApiError(errorData.message || "Registration failed");
        return;
      }
      router.push("/");
    } catch (error) {
      setApiError("An unexpected error occurred. Please try again.");
      console.error("Error during register:", error);
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="font-sans antialiased p-6">
      <button 
        onClick={handleBackClick}
        className="flex items-center font-semibold mb-4 text-white hover:text-gray-300 transition-colors"
        type="button"
      >
        <ArrowLeft size={20} className="text-white mr-2" />
        Back
      </button>
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center"
      >
        <h4 className="font-mono text-center text-2xl font-bold p-6">
          Welcome onboard, yapper!
        </h4>
        <div className="flex flex-col gap-3 w-full">
          {apiError && (
            <div className="text-red-500 text-sm text-center">{apiError}</div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <Input {...register("username")} type="text" placeholder="john.doe" />
            {errors.username && (
              <div className="text-red-500 text-sm">
                {errors.username.message}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Full Name
            </label>
            <Input {...register("name")} type="text" placeholder="John Doe" />
            {errors.name && (
              <div className="text-red-500 text-sm">{errors.name.message}</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <Input
              {...register("email")}
              type="email"
              placeholder="john@doe.com"
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <Input
              {...register("password")}
              type="password"
              placeholder="*******"
            />
            {errors.password && (
              <div className="text-red-500 text-sm">
                {errors.password.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full mt-6 gap-4">
          <Button disabled={isSubmitting} label="Sign Up" accent={false} />
        </div>
      </form>
    </div>
  );
}