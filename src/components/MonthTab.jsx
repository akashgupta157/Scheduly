import React from "react";
import { current, daysOfWeek } from "@/utils/mics";
import { useSelector } from "react-redux";
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
  return (
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
                <div className="h-full py-1.5">
                  <p
                    className="size-6 flex items-center justify-center mx-auto rounded-full text-xs font-bold"
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
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
