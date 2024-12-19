"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import CalendarGrid from "@/components/CalendarGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "@/redux/slices/eventSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.isDark);
  const token = useSelector((state) => state.user.user.token);
  useEffect(() => {
    dispatch(fetchEvents(token));
  }, []);
  return (
    <div
      className={`h-screen ${
        theme ? "bg-zinc-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Navbar />
      <CalendarGrid />
    </div>
  );
}
