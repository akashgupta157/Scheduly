import React from "react";
import { useSelector } from "react-redux";
import MonthTab from "./MonthTab";

export default function CalendarGrid() {
  const theme = useSelector((state) => state.theme.isDark);
  const currentTab = useSelector((state) => state.tab.currentTab);
  return (
    <div
      className={`h-[87svh] mx-5 rounded-2xl border shadow-lg ${
        theme ? "bg-[#010502]" : "bg-white"
      } `}
    >
      {currentTab === "Month" && <MonthTab />}
    </div>
  );
}
