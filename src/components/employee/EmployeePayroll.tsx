"use client";
import { generatePayslip } from "@/src/utils/generatePayslip";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const payrollData = [
  { month: "Jun 2025", salary: 65000, deductions: 2000, bonus: 1500, date: "30-Jun-25", status: "Paid" },
  { month: "May 2025", salary: 65000, deductions: 2000, bonus: 1500, date: "30-May-25", status: "Pending" },
  { month: "Apr 2025", salary: 65000, deductions: 2000, bonus: 1500, date: "30-Apr-25", status: "Paid" },
  { month: "Mar 2025", salary: 65000, deductions: 2000, bonus: 1500, date: "30-Mar-25", status: "Paid" },
  { month: "Feb 2025", salary: 65000, deductions: 2000, bonus: 1500, date: "30-Feb-25", status: "Paid" },
  { month: "Jan 2025", salary: 65000, deductions: 2000, bonus: 1500, date: "30-Jan-25", status: "Paid" },
];

const totalEarnings = payrollData.reduce((a, b) => a + b.salary, 0);
const totalDeductions = payrollData.reduce((a, b) => a + b.deductions, 0);
const totalBonus = payrollData.reduce((a, b) => a + b.bonus, 0);

const chartData = (value: number) => [
  { name: "Used", value },
  { name: "Remaining", value: totalEarnings - value },
];

function SemiCircleChart({ value, color }: { value: number; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={chartData(value)}
          startAngle={180}
          endAngle={0}
          innerRadius={70}
          outerRadius={90}
          dataKey="value"
        >
          <Cell fill={color} />
          <Cell fill="#E5E7EB" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default function EmployeePayroll() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Payroll Table */}
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b text-gray-500">
            <th className="pb-3">Month</th>
            <th>Basic Salary</th>
            <th>Deductions</th>
            <th>Bonuses</th>
            <th>Payment Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {payrollData.map((item, i) => (
            <tr key={i} className="border-b last:border-none">
              <td className="py-3">{item.month}</td>
              <td>₹{item.salary.toLocaleString()}</td>
              <td>₹{item.deductions.toLocaleString()}</td>
              <td>₹{item.bonus.toLocaleString()}</td>
              <td>{item.date}</td>
              <td>
                <span
                  className={`flex items-center gap-2 ${
                    item.status === "Paid"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  ● {item.status}
                </span>
              </td>
              <td className="text-blue-600 cursor-pointer">
                {item.status === "Paid" ? "View Payslip" : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Insights Section */}
      <div className="mt-12">
        <h3 className="text-sm font-semibold text-gray-700 mb-6">
          Insights & Actions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-sm mb-2">Total Earnings (YTD)</p>
            <SemiCircleChart value={totalEarnings} color="#7C3AED" />
            <p className="font-semibold mt-2">
              ₹{totalEarnings.toLocaleString()}
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm mb-2">Total Deductions (YTD)</p>
            <SemiCircleChart value={totalDeductions} color="#FACC15" />
            <p className="font-semibold mt-2">
              ₹{totalDeductions.toLocaleString()}
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm mb-2">Total Bonuses (YTD)</p>
            <SemiCircleChart value={totalBonus} color="#22C55E" />
            <p className="font-semibold mt-2">
              ₹{totalBonus.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
