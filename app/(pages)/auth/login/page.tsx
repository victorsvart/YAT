"use client";
import { Button } from "@/app/(components)/button/button-component";
import { Input } from "@/app/(components)/input/input-component";
import { LoginForm, LoginFormSchema } from "@/app/lib/types/schema/login-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
  });
  const router = useRouter();
  const params = useSearchParams();
  const [apiError, setApiError] = React.useState<string | null>(null);
  const [isRedirect, setIsRedirect] = React.useState<boolean>(false);
  
  useEffect(() => {
    const isRedirect = params.get("redirect") === "true";
    setIsRedirect(isRedirect);
  });
  
  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setApiError(errorData.message || "Login failed");
        return;
      }
      router.push("/dashboard/home/general");
    } catch (error) {
      setApiError("An unexpected error occurred. Please try again.");
      console.error("Error during login:", error);
    }
  };

  const handleSignUpRedirect = () => {
    router.push("/auth/register");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="font-sans antialiased flex flex-col justify-center items-center p-6"
    >
      <h4 className="font-mono text-2xl font-bold p-6">Welcome, yapper!</h4>
      <div className="flex flex-col gap-3 w-full">
        {apiError && (
          <div className="text-red-500 text-sm text-center">{apiError}</div>
        )}
        {isRedirect && (
          <div className="text-red-500 text-sm font-semibold text-center">
            You need to sign in to continue!
          </div>
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
        <Button
          disabled={isSubmitting}
          label={isSubmitting ? "Signing in..." : "Sign in"}
          accent={false}
        />
        <div className="flex items-center gap-2">
          <hr className="flex-1 border-gray-700" />
          <span className="text-gray-400 text-sm">or</span>
          <hr className="flex-1 border-gray-700" />
        </div>
        <Button 
          disabled={isSubmitting} 
          label="Sign Up" 
          accent={true}
          type="button"
          onClick={handleSignUpRedirect}
        />
      </div>
    </form>
  );
}