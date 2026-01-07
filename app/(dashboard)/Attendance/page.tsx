"use client";

import AttendanceStats from "@/app/attendance/AttendanceStats";
import AttendanceTabs from "@/app/attendance/AttendanceTabs";

export default function AttendanceLeavePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold">Attendance & Leave</h1>
        <p className="text-sm text-muted-foreground">
          Track attendance and manage leave requests
        </p>
      </div>

      {/* Top Status Cards */}
      <AttendanceStats />

      {/* Tabs */}
      <AttendanceTabs />
    </div>
  );
}
