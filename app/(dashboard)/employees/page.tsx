"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";
import Link from "next/link";

export const employeeData = [
  {
    name: "Arjun Rao",
    employeeId: "EMP-023",
    department: "Finance",
    role: "Accountant",
    status: "Inactive",
  },
  {
    name: "Rahul Kumar",
    employeeId: "EMP-024",
    department: "Engineering",
    role: "Engineer",
    status: "Active",
  },
  {
    name: "Priya Singh",
    employeeId: "EMP-025",
    department: "HR",
    role: "HR Executive",
    status: "On Leave",
  },
  {
    name: "Arjun Rao",
    employeeId: "EMP-026",
    department: "Finance",
    role: "Accountant",
    status: "Inactive",
  },
  {
    name: "Rahul Kumar",
    employeeId: "EMP-027",
    department: "HR",
    role: "HR Executive",
    status: "Active",
  },
  {
    name: "Priya Singh",
    employeeId: "EMP-028",
    department: "Tech",
    role: "Developer",
    status: "On Leave",
  },
  {
    name: "Arjun Rao",
    employeeId: "EMP-029",
    department: "Finance",
    role: "Accountant",
    status: "Inactive",
  },
  {
    name: "Rahul Kumar",
    employeeId: "EMP-030",
    department: "HR",
    role: "HR Executive",
    status: "Active",
  },
  {
    name: "Pillamarrivarun",
    employeeId: "EMP-031",
    department: "Design",
    role: "UI/UX Designer",
    status: "Active",
  },
];

const Page = () => {
  const [activeTab, setActiveTab] = useState("employee");

  // Sample data

  const assetData = [
    {
      name: "MacBook 16 pro",
      id: "AST-000001",
      assignedTo: "Varun pillamarrri",
      category: "Laptop",
      date: "25 Jan 2025",
    },
    {
      name: "Dell XPS 15",
      id: "AST-000002",
      assignedTo: "Priya Singh",
      category: "Laptop",
      date: "26 Jan 2025",
    },
    {
      name: "iPad Pro",
      id: "AST-000003",
      assignedTo: "Rahul Sharma",
      category: "Tablet",
      date: "27 Jan 2025",
    },
    {
      name: "iPhone 15",
      id: "AST-000004",
      assignedTo: "Arjun Rao",
      category: "Mobile",
      date: "28 Jan 2025",
    },
  ];

  const shiftTeams = [
    {
      name: "Design Team",
      members: [
        {
          name: "Rahul Sharma",
          role: "UI/UX Designer",
          shifts: [
            "06:00 pm - 03:00 am",
            "",
            "10:00 pm - 04:00 am",
            "",
            "07:00 pm - 04:00 am",
          ],
          color: "orange",
        },
        {
          name: "Priya Verma",
          role: "UI/UX Designer",
          shifts: ["", "All day Unavailable", "", "07:00 pm - 04:00 am", ""],
          color: "orange",
        },
      ],
    },
    {
      name: "Development Team",
      members: [
        {
          name: "Sneha Kapoor",
          role: "Frontend Developer",
          shifts: [
            "08:00 pm - 03:00 am",
            "",
            "06:00 pm - 03:00 am",
            "",
            "06:00 pm - 03:00 am",
          ],
          color: "blue",
        },
        {
          name: "Rohit Mehta",
          role: "Backend Developer",
          shifts: [
            "",
            "06:00 pm - 03:00 am",
            "All day Unavailable",
            "06:00 pm - 03:00 am",
            "",
          ],
          color: "blue",
        },
      ],
    },
  ];

  // Render functions for each tab
  const renderEmployeeTab = () => (
    <>
      {/* Header for Employee Tab */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Employee Database
        </h1>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, ID, department"
              className="pl-10 pr-4 py-2 w-72 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter */}
          <button
            onClick={() => alert("Filter clicked")}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm bg-white hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            FILTER
          </button>

          {/* Add Employee */}
          <button
            onClick={() => alert("Add Employee clicked")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            ADD EMPLOYEE
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-6 py-4">Employee ID</th>
              <th className="text-left px-6 py-4">Department</th>
              <th className="text-left px-6 py-4">Role</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {employeeData.map((employee, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4">{employee.name}</td>
                <td className="px-6 py-4">{employee.employeeId}</td>
                <td className="px-6 py-4">{employee.department}</td>
                <td className="px-6 py-4">{employee.role}</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        employee.status === "Active"
                          ? "bg-green-500"
                          : employee.status === "On Leave"
                          ? "bg-yellow-400"
                          : "bg-red-500"
                      }`}
                    />
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-4">
                  <Link href={`/employees/${employee.employeeId}`}>
                    <button className="flex items-center gap-1 text-blue-600 hover:underline">
                      View
                    </button>
                  </Link>

                  <button
                    onClick={() => alert(`Edit ${employee.name}`)}
                    className="flex items-center gap-1 text-indigo-600 hover:underline"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          `Are you sure you want to delete ${employee.name}?`
                        )
                      ) {
                        alert(`${employee.name} deleted`);
                      }
                    }}
                    className="flex items-center gap-1 text-red-500 hover:underline"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center gap-2 py-4 text-sm text-blue-600">
          <button
            onClick={() => alert("Previous page")}
            className="hover:underline"
          >
            Previous
          </button>
          <button className="font-semibold">1</button>
          <button onClick={() => alert("Page 2")} className="hover:underline">
            2
          </button>
          <button
            onClick={() => alert("Next page")}
            className="hover:underline"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );

  const renderAssetTab = () => (
    <>
      {/* Header for Asset Tab */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Asset Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track Company laptops and Other items
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, ID, department"
            className="pl-10 pr-4 py-2 w-72 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="pb-4">Asset Name</th>
              <th className="pb-4">Asset ID</th>
              <th className="pb-4">Assigned to</th>
              <th className="pb-4">Category</th>
              <th className="pb-4">Requested Date</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {assetData.map((asset, i) => (
              <tr key={i} className="border-t">
                <td className="py-4">{asset.name}</td>
                <td className="py-4">{asset.id}</td>
                <td className="py-4">{asset.assignedTo}</td>
                <td className="py-4">{asset.category}</td>
                <td className="py-4">{asset.date}</td>
                <td className="py-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => alert(`Asset ${asset.name} approved`)}
                      className="px-4 py-1 rounded-md bg-green-500 text-white text-xs hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => alert(`Asset ${asset.name} rejected`)}
                      className="px-4 py-1 rounded-md border border-red-500 text-red-500 text-xs hover:bg-red-50"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderShiftTab = () => (
    <>
      {/* Header for Shift Tab */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Shift Scheduling
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee shifts and schedules
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by name, ID, department"
          className="px-4 py-2 w-72 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">Shift Schedule</h2>
          <button
            onClick={() => alert("Create Schedule clicked")}
            className="px-4 py-2 bg-blue-700 text-white rounded-md text-sm hover:bg-blue-800"
          >
            Create Schedule
          </button>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-3 mb-4 text-sm">
          <button
            onClick={() => alert("Previous week")}
            className="p-1 border rounded-md hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert("Next week")}
            className="p-1 border rounded-md hover:bg-gray-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="font-medium">Jan 01 - Jan 05, 2025</span>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-6 gap-4 mb-3 text-xs text-gray-600">
          <div />
          <div className="text-center bg-gray-50 py-2 rounded-md">Mon 01</div>
          <div className="text-center bg-gray-50 py-2 rounded-md">Tue 02</div>
          <div className="text-center bg-gray-50 py-2 rounded-md">Wed 03</div>
          <div className="text-center bg-gray-50 py-2 rounded-md">Thu 04</div>
          <div className="text-center bg-gray-50 py-2 rounded-md">Fri 05</div>
        </div>

        {/* Team Block */}
        {shiftTeams.map((team, i) => (
          <div key={i} className="mb-6">
            {/* Team Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-sm text-gray-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                {team.name}
              </span>
              <button
                onClick={() => alert(`Add people to ${team.name}`)}
                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-700 text-white text-xs rounded-md hover:bg-indigo-800"
              >
                <Users className="w-4 h-4" />
                Add people
              </button>
            </div>

            {/* Members */}
            {team.members.map((member, j) => (
              <div key={j} className="grid grid-cols-6 gap-4 mb-3">
                <div className="border rounded-md p-2 text-xs">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-gray-500">{member.role}</p>
                </div>

                {member.shifts.map((shift, k) => (
                  <div
                    key={k}
                    onClick={() => {
                      if (shift) {
                        alert(
                          `Shift details: ${shift}\nMember: ${member.name}`
                        );
                      } else {
                        alert(
                          `Click to assign shift for ${member.name} on Day ${
                            k + 1
                          }`
                        );
                      }
                    }}
                    className={`border rounded-md p-2 text-xs text-center cursor-pointer ${
                      shift.includes("Unavailable")
                        ? "text-blue-600 font-medium bg-blue-50 border-blue-200 hover:bg-blue-100"
                        : shift
                        ? member.color === "orange"
                          ? "bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100"
                          : "bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {shift || "Click to assign"}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="p-8 bg-[#f6f7fb] min-h-screen">
      {/* Tabs */}
      <div className="flex gap-8 border-b mb-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab("employee")}
          className={`pb-2 ${
            activeTab === "employee"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Employee Details
        </button>
        <button
          onClick={() => setActiveTab("asset")}
          className={`pb-2 ${
            activeTab === "asset"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Asset Management
        </button>
        <button
          onClick={() => setActiveTab("shift")}
          className={`pb-2 ${
            activeTab === "shift"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Shift Scheduling
        </button>
      </div>

      {/* Render active tab content */}
      {activeTab === "employee" && renderEmployeeTab()}
      {activeTab === "asset" && renderAssetTab()}
      {activeTab === "shift" && renderShiftTab()}
    </div>
  );
};

export default Page;
