// app/(dashboard)/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/src/components/ThemeToggle"; // Fixed typo
import HRCalendar from "@/components/HRCalendar";
import {
  Users,
  CalendarCheck,
  DollarSign,
  AlertTriangle,
  Plus,
  CheckCircle,
  Play,
  BarChart2,
  Cake,
  Calendar,
  CreditCard,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="mt-5 space-y-8 p-4">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Welcome back, Gundala Upendar! Attendance, leaves & payroll in one place
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Customize colors
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Employees",
            value: "1,247",
            sub: "+12 this month",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
          },
          {
            title: "Active Leaves",
            value: "24",
            sub: "5 pending approvals",
            icon: CalendarCheck,
            color: "text-orange-500",
            bgColor: "bg-orange-50 dark:bg-orange-900/20",
          },
          {
            title: "Payroll Status",
            value: "$2.4M",
            sub: "Processed",
            icon: DollarSign,
            color: "text-green-600",
            bgColor: "bg-green-50 dark:bg-green-900/20",
          },
          {
            title: "Pending Approvals",
            value: "18",
            sub: "Required attention",
            icon: AlertTriangle,
            color: "text-red-500",
            bgColor: "bg-red-50 dark:bg-red-900/20",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-neutral-900 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-neutral-800"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.title}</p>
                <h2 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{item.value}</h2>
                <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                  {item.sub}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${item.bgColor}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions + Department Overview */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm p-5">
          <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Employee
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <CheckCircle className="w-4 h-4 mr-2" /> Approve Leaves
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Play className="w-4 h-4 mr-2" /> Run Payroll
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <BarChart2 className="w-4 h-4 mr-2" /> View Reports
            </Button>
          </div>
          
          {/* Payroll Preview Section */}
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Payroll Preview</h4>
            <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4">
              <div className="space-y-3">
                {[
                  { name: "John Doe", id: "EMP-001", dept: "Engineering", amount: "$8,500" },
                  { name: "Jane Smith", id: "EMP-002", dept: "Sales", amount: "$6,200" },
                  { name: "Mike Johnson", id: "EMP-003", dept: "Design", amount: "$7,800" },
                ].map((emp, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-neutral-700 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{emp.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{emp.id} • {emp.dept}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">{emp.amount}</p>
                      <p className="text-xs text-green-600 dark:text-green-400">Ready</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                Proceed to Payroll Module
              </Button>
            </div>
          </div>
        </div>

        {/* Department Overview */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm p-5">
          <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Department Overview</h3>
          <div className="space-y-4">
            {[
              { name: "Engineering", count: 324, color: "bg-blue-500" },
              { name: "Sales", count: 186, color: "bg-green-500" },
              { name: "Design", count: 86, color: "bg-purple-500" },
              { name: "HR", count: 56, color: "bg-orange-500" },
              { name: "Marketing", count: 42, color: "bg-pink-500" },
              { name: "Finance", count: 38, color: "bg-teal-500" },
            ].map((dept, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">{dept.name}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{dept.count}</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${dept.color} rounded-full`}
                    style={{ width: `${(dept.count / 324) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Department Summary */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-neutral-800">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,247</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Total Employees</p>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">96%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Attendance Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HR Calendar + Upcoming Events */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* HR Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm p-5">
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">HR Calendar</h3>
            <HRCalendar />
          </div>
        </div>

        {/* Upcoming Events & Alerts */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm p-5">
          <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Upcoming Events & Alerts</h3>
          <div className="space-y-6">
            {/* Birthdays */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                  <Cake className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                </div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Birthdays This Week</h4>
              </div>
              <div className="space-y-2">
                {["Pillolamari Varun - Tomorrow", "Jane Smith - Sep 20", "Mike Johnson - Sep 22"].map((birthday, i) => (
                  <div key={i} className="text-sm bg-gray-50 dark:bg-neutral-800 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer">
                    <div className="font-medium text-gray-900 dark:text-white">{birthday.split(' - ')[0]}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{birthday.split(' - ')[1]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Holidays */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Upcoming Holidays</h4>
              </div>
              <div className="text-sm bg-gray-50 dark:bg-neutral-800 rounded-lg p-3">
                <div className="font-medium text-gray-900 dark:text-white">Independence Day</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tomorrow (National Holiday)</div>
              </div>
            </div>

            {/* Salary Alert */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <CreditCard className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Salary Alert</h4>
              </div>
              <div className="text-sm bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200 dark:border-red-800">
                <div className="font-medium text-red-700 dark:text-red-400">September Salary Not Processed</div>
                <div className="text-xs text-red-600 dark:text-red-300 mt-1">
                  Payroll processing deadline: Tomorrow, 5 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}