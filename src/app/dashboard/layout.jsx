"use client";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
export default function Layout({ children }) {
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  if (!isAuth) {
    redirect("/login");
  }
  return <>{children}</>;
}
