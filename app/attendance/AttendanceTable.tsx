const data = [
  {
    date: "Nov 12",
    name: "Employee 1",
    checkIn: "09:15 AM",
    checkOut: "06:10 PM",
    status: "Present",
  },
  {
    date: "Nov 12",
    name: "Employee 6",
    checkIn: "-",
    checkOut: "-",
    status: "Leave",
  },
];

export default function AttendanceTable() {
  return (
    <div className="rounded-xl border bg-white p-5">
      <h3 className="font-medium mb-4">Employee Attendance</h3>

      <table className="w-full text-sm">
        <thead className="text-muted-foreground border-b">
          <tr>
            <th className="py-2 text-left">Date</th>
            <th className="text-left">Employee</th>
            <th className="text-left">Check In</th>
            <th className="text-left">Check Out</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="py-3">{row.date}</td>
              <td>{row.name}</td>
              <td>{row.checkIn}</td>
              <td>{row.checkOut}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    row.status === "Present"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
