import axios from "axios";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import QuillEditor from "./QuillEditor";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DateTimePicker } from "./DateTimePicker";
import { configure, current, daysOfWeek } from "@/utils/mics";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
export default function MonthTab() {
  const selected = useSelector((state) => state.tab.selected);
  const daysInMonth = new Date(selected.year, selected.month + 1, 0).getDate();
  const firstDayOfMonth = new Date(selected.year, selected.month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  const emptyCellsBefore = Array(firstDayOfMonth).fill(null);
  const fullGrid = [...emptyCellsBefore, ...days];
  const weeks = [];
  for (let i = 0; i < fullGrid.length; i += 7) {
    weeks.push(fullGrid.slice(i, i + 7));
  }
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  return (
    <>
      <table className="w-full h-full border table-fixed rounded overflow-hidden">
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day} className="border p-2 text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <td
                  key={dayIndex}
                  className={`${day === null ? "opacity-50" : "border"}`}
                >
                  <div
                    className={`size-full py-1 flex flex-col overflow-hidden ${
                      weeks.length === 5
                        ? "h-[15svh] max-h-[15svh]"
                        : "h-[13svh] max-h-[13svh]"
                    }`}
                    onClick={() => {
                      setOpen(true);
                      setSelectedDate(day);
                    }}
                  >
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="size-6 flex items-center justify-center mx-auto rounded-full text-sm font-bold"
                      style={{
                        backgroundColor:
                          day === current.date &&
                          selected.month === current.month &&
                          selected.year === current.year &&
                          "#3b82f6",
                      }}
                    >
                      {day || ""}
                    </p>
                    {day && <EventList selected={{ ...selected, date: day }} />}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {open && (
        <EventForm
          selected={{ ...selected, date: selectedDate }}
          setOpen={setOpen}
        />
      )}
    </>
  );
}

const EventList = ({ selected }) => {
  const events = useSelector((state) => state.eventList.events);
  return <div>
    
  </div>;
};

const EventForm = ({ selected, setOpen }) => {
  const token = useSelector((state) => state.user.user.token);
  const config = configure(token);
  const theme = useSelector((state) => state.theme.isDark);
  const [eventDetail, setEventDetail] = useState({
    title: "",
    description: "",
    location: "",
    start: new Date(selected.year, selected.month, selected.date),
    end: new Date(selected.year, selected.month, selected.date),
    color: "#3b82f6",
  });
  async function handleSave(e) {
    e.preventDefault();
    if (!eventDetail.title || eventDetail.start > eventDetail.end) {
      alert(
        "Please fill in the title and ensure the start date is before the end date."
      );
      return;
    }
    const { data } = await axios.post("/api/event", eventDetail, config);
    console.log(data);
    setOpen(false);
  }
  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 flex items-start justify-center bg-black/50"
      onClick={() => setOpen(false)}
    >
      <form
        action=""
        className={`border mt-[10svh] p-5 rounded-xl space-y-3 max-h-[85svh] ${
          theme ? "bg-zinc-800" : "bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Event Details</h1>
          <X className="cursor-pointer" onClick={() => setOpen(false)} />
        </div>
        <div className="space-y-5">
          <Input
            value={eventDetail.title}
            placeholder="Add Title ..."
            onChange={(e) =>
              setEventDetail({ ...eventDetail, title: e.target.value })
            }
            required
            className="md:text-xl capitalize bg-transparent border-0 border-b p-0 rounded-none outline-none placeholder:text-neutral-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-b-2"
          />
          <div className="flex items-center gap-5">
            <DateTimePicker
              data={eventDetail.start}
              onChange={(newDateTime) =>
                setEventDetail({ ...eventDetail, start: newDateTime })
              }
              theme={theme}
            />
            -
            <DateTimePicker
              data={eventDetail.end}
              onChange={(newDateTime) =>
                setEventDetail({ ...eventDetail, end: newDateTime })
              }
              theme={theme}
            />
          </div>
          <Input
            value={eventDetail.location}
            placeholder="Add Location ..."
            onChange={(e) =>
              setEventDetail({ ...eventDetail, location: e.target.value })
            }
            className="bg-transparent capitalize"
          />
          <QuillEditor
            value={eventDetail.description}
            onChange={(content) =>
              setEventDetail((prev) => ({ ...prev, description: content }))
            }
          />
          <div className="flex justify-between">
            <Select
              defaultValue={eventDetail.color}
              onValueChange={(e) => {
                setEventDetail({ ...eventDetail, color: e });
              }}
            >
              <SelectTrigger className="w-fit bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={`${theme && "bg-zinc-800"}`}>
                <SelectGroup className="grid grid-cols-2">
                  <SelectItem value="#dc2626">
                    <p className="bg-[#dc2626] size-5 rounded-full mr-2" />
                  </SelectItem>
                  <SelectItem value="#f87171">
                    <p className="bg-[#f87171] size-5 rounded-full mr-2" />
                  </SelectItem>
                  <SelectItem value="#f97316">
                    <p className="bg-[#f97316] size-5 rounded-full mr-2" />
                  </SelectItem>
                  <SelectItem value="#fbbf24">
                    <p className="bg-[#fbbf24] size-5 rounded-full mr-2" />
                  </SelectItem>
                  <SelectItem value="#34d399">
                    <p className="bg-[#34d399] size-5 rounded-full mr-2" />
                  </SelectItem>
                  <SelectItem value="#16a34a">
                    <p className="bg-[#16a34a] size-5 rounded-full mr-2" />
                  </SelectItem>
                  <SelectItem value="#3b82f6">
                    <p className="bg-[#3b82f6] size-5 rounded-full mr-2" />
                  </SelectItem>
                  <SelectItem value="#7e22ce">
                    <p className="bg-[#7e22ce] size-5 rounded-full mr-2" />
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </form>
    </div>
  );
};
