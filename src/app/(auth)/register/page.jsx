"use client";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LOGIN } from "@/redux/slices/userSlice";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
export default function Register() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const dispatch = useDispatch();
  async function onSubmit(values) {
    setLoading(true);
    const { data } = await axios.post("/api/auth/register", values);
    setUserDetail(data);
    setLoading(false);
  }
  const { data: session } = useSession();
  async function handleGoogleSignIn() {
    const { data } = await axios.post("/api/auth/register", {
      name: session.user.name,
      email: session.user.email,
      profilePicture: session.user.image,
      provider: "google",
    });
    setUserDetail(data);
  }
  useEffect(() => {
    if (session) {
      handleGoogleSignIn();
    }
  }, [session]);
  useEffect(() => {
    if (!userDetail) return;
    if (userDetail?.success) {
      toast({
        variant: "success",
        description: userDetail?.message,
      });
      dispatch(LOGIN(userDetail));
    } else {
      toast({
        variant: "destructive",
        description: userDetail?.message,
      });
    }
  }, [userDetail]);
  return (
    <div className="bg-[#010502] h-[100dvh] text-[#fdfdfc] flex justify-center items-center p-5">
      <div className="rounded-lg border border-gray-500 shadow-sm px-5 md:px-8 py-6 w-full md:w-[420px]">
        <div className="flex flex-col pb-3 md:pb-5 space-y-1">
          <h1 className="font-semibold text-2xl">Create an account</h1>
          <p className="text-sm text-gray-400">
            Please fill in the form below to create an account
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 md:space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      className="bg-[#010502] border-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#010502] border-gray-500"
                      {...field}
                      placeholder="m@expample.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-[#010502] border-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-[#dee0e1] text-[#010502] hover:bg-white"
              disabled={loading}
            >
              {loading ? "Loading..." : "Create account"}
            </Button>
          </form>
        </Form>
        <div className="relative flex justify-center text-xs uppercase mt-4">
          <div className="absolute border-t border-gray-500 w-full top-1/2"></div>
          <span className="bg-[#010502] px-2 text-muted-foreground z-10">
            Or continue with
          </span>
        </div>
        <Button
          className="w-full mt-4 bg-[#010502] border border-gray-500"
          onClick={() => {
            signIn("google");
          }}
          disabled={loading}
        >
          <Image
            src="/google.svg"
            alt="google"
            width={18}
            height={18}
            className="filter-white"
          />
          Google
        </Button>
        <p className="text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-[#dee0e1]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
