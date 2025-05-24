"use client";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/lib/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { set } from "react-hook-form";
import { toast } from "sonner";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setAuthenticated } = useAuth();

  const {
    mutate: login,
    isPending: isLogggingIn,
    isSuccess,
    isError,
    data,
    error,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (dataSuccess) => {
      console.log("dataSuccess", dataSuccess);
      localStorage.setItem("accessToken", dataSuccess.access);
      localStorage.setItem("refreshToken", dataSuccess.refresh);
      queryClient.invalidateQueries({ queryKey: ["login"] });
      setAuthenticated(true);
      router.replace("/dashboard");
      toast.success("Loged in successfully");
    },
    onError: (err: any) => {
      toast.error("Credentials are incorrect");
      console.log(err.message);
    },
  });

  return {
    login,
    isLogggingIn,
    isSuccess,
    isError,
    error,
    data,
  };
}
