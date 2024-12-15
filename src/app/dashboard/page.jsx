"use client";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "@/components/Navbar";
import CalendarGrid from "@/components/CalendarGrid";

export default function Dashboard() {
  const theme = useSelector((state) => state.theme.isDark);
  return (
    <div
      className={`h-screen ${
        theme ? "bg-zinc-900 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <Navbar />
      <CalendarGrid />
    </div>
  );
}
