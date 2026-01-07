"use client";

import { useState } from "react";
import AttendanceTable from "./AttendanceTable";
import CalendarView from "./CalenderView";
import LeaveRequests from "./LeaveRequests";

const tabs = ["Attendance", "Calendar View", "Leave Request"];

export default function AttendanceTabs() {
  const [active, setActive] = useState("Attendance");

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="inline-flex rounded-full bg-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 text-sm rounded-full transition ${
              active === tab
                ? "bg-blue-600 text-white"
                : "text-muted-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {active === "Attendance" && <AttendanceTable />}
      {active === "Calendar View" && <CalendarView />}
      {active === "Leave Request" && <LeaveRequests />}
    </div>
  );
}
