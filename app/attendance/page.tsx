"use client";
import AttendanceStats from "@/app/attendance/AttendanceStats";
import AttendanceTabs from "@/app/attendance/AttendanceTabs";
import AttendanceTable from "@/app/attendance/AttendanceTable";
import CalendarView from "./CalenderView";
import LeaveRequests from "./LeaveRequests";

export default function AttendanceLeavePage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Attendance & Leave</h1>
        <p className="text-sm text-muted-foreground">
          Track attendance and manage leave requests
        </p>
      </div>
      <AttendanceStats />
      <AttendanceTabs />
    </div>
  );
}
