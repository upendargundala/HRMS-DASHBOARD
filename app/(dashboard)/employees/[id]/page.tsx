"use client";

import Link from "next/link";
import { useState } from "react";
import EmployeeHeader from "@/src/components/employee/EmployeeHeader";
import EmployeeOverview from "@/src/components/employee/EmployeeOverview";
import EmployeePayroll from "@/src/components/employee/EmployeePayroll";

export default function EmployeeProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "payroll">("overview");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* PAGE TITLE */}
      <h1 className="text-2xl font-semibold mb-1">Employee Profile</h1>

      {/* BREADCRUMB */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>
        {" > "}
        <Link href="/employees" className="hover:text-blue-600">
          Employee Database
        </Link>
        {" > "}
        <span className="text-gray-700 font-medium">
          Pillalamarri Varun
        </span>
      </div>

      {/* PROFILE HEADER + TABS */}
      <EmployeeHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* TAB CONTENT */}
      <div className="mt-6">
        {activeTab === "overview" && <EmployeeOverview />}
        {activeTab === "payroll" && <EmployeePayroll />}
      </div>
    </div>
  );
}
