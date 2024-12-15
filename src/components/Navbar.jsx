import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { signOut } from "next-auth/react";
import { current, monthName } from "@/utils/mics";
import { LOGOUT } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/redux/slices/themeSlice";
import { setSelected, setTab } from "@/redux/slices/tabSlice";
import { Calendar, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
export default function Navbar() {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.isDark);
  const currentTab = useSelector((state) => state.tab.currentTab);
  const selected = useSelector((state) => state.tab.selected);
  return (
    <div
      className={`flex items-center justify-between w-full h-[10svh] px-5 ${
        theme ? "bg-zinc-900 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div className="flex items-center gap-20">
        <div className="flex items-end gap-1">
          <div className="relative size-12">
            <Calendar className="absolute size-12" />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1">
              {current.date}
            </p>
          </div>
          <h1 className="text-3xl font-bold" id="logo">
            Scheduly
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className={`rounded-full bg-transparent border px-7 ${
              theme
                ? "border-white text-white hover:bg-[#272a2f]"
                : "border-zinc-400 text-black hover:bg-gray-300"
            }`}
            onClick={() => {
              dispatch(setSelected(current));
            }}
          >
            Today
          </Button>
          <div>
            <Button
              className={`rounded-full size-10 bg-transparent ${
                theme
                  ? " text-white hover:bg-[#272a2f]"
                  : " text-black hover:bg-gray-300"
              }`}
              onClick={() => {
                if (selected.month === 0) {
                  dispatch(
                    setSelected({
                      ...selected,
                      month: 11,
                      year: selected.year - 1,
                    })
                  );
                } else {
                  dispatch(
                    setSelected({ ...selected, month: selected.month - 1 })
                  );
                }
              }}
            >
              <ChevronLeft />
            </Button>
            <Button
              className={`rounded-full size-10 bg-transparent ${
                theme
                  ? " text-white hover:bg-[#272a2f]"
                  : " text-black hover:bg-gray-300"
              }`}
              onClick={() => {
                if (selected.month === 11) {
                  dispatch(
                    setSelected({
                      ...selected,
                      month: 0,
                      year: selected.year + 1,
                    })
                  );
                } else {
                  dispatch(
                    setSelected({ ...selected, month: selected.month + 1 })
                  );
                }
              }}
            >
              <ChevronRight />
            </Button>
          </div>
          <p className="text-2xl font-medium">
            {monthName[selected.month]} {selected.year}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Switch
          checked={theme}
          onCheckedChange={() => dispatch(toggleTheme())}
        />
        <div
          className={`flex items-center gap-2 border px-3 py-1 rounded-md ${
            theme ? "border-white" : "border-black"
          }`}
        >
          {["Day", "Week", "Month"].map((tab) => (
            <p
              key={tab}
              className={`px-3 py-1 cursor-pointer rounded-md ${
                currentTab === tab
                  ? theme
                    ? "bg-[#010502]"
                    : "bg-gray-400"
                  : null
              }`}
              onClick={() => currentTab !== tab && dispatch(setTab(tab))}
            >
              {tab}
            </p>
          ))}
        </div>
        <HoverCard>
          <HoverCardTrigger>
            <div className="cursor-pointer">
              {user?.profilePicture ? (
                <Image
                  src={user.profilePicture}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="size-10 rounded-full"
                />
              ) : (
                <button
                  className={`size-9 rounded-full flex items-center justify-center`}
                  style={{ backgroundColor: `#${user?.color}` }}
                >
                  {user?.name[0]}
                </button>
              )}
            </div>
          </HoverCardTrigger>
          <HoverCardContent
            className={`p-2 w-fit opacity-90 border-0 ${
              theme ? "bg-zinc-600 text-white" : "bg-gray-300"
            }`}
          >
            <p className={`text-xs`}>{user?.name}</p>
            <p className={`text-xs`}>{user?.email}</p>
          </HoverCardContent>
        </HoverCard>
        <div>
          <Button
            className={`rounded-full bg-transparent border px-7 ${
              theme
                ? "border-white text-white hover:bg-[#272a2f]"
                : "border-black text-black hover:bg-gray-300"
            }`}
            onClick={() => {
              dispatch(LOGOUT());
              signOut();
            }}
          >
            <LogOut /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
