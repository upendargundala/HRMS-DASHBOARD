export default function LeaveRequests() {
  return (
    <div className="rounded-xl border bg-white p-5">
      <h3 className="font-medium mb-4">Leave Requests</h3>

      <div className="space-y-3">
        <LeaveCard name="Employee 3" type="Sick Leave" days="2 Days" />
        <LeaveCard name="Employee 7" type="Casual Leave" days="1 Day" />
      </div>
    </div>
  );
}

function LeaveCard({
  name,
  type,
  days,
}: {
  name: string;
  type: string;
  days: string;
}) {
  return (
    <div className="flex justify-between items-center border rounded-lg p-4">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{type} · {days}</p>
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm bg-green-600 text-white rounded">
          Approve
        </button>
        <button className="px-3 py-1 text-sm bg-red-500 text-white rounded">
          Reject
        </button>
      </div>
    </div>
  );
}
