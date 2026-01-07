export default function AttendanceStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard title="Biometric / GPS" src="app/identification.png" value="Connected" status />
      <StatCard title="Total Employees" src="app/employees.png" value="50" />
      <StatCard title="Present Today" src="app/present.png" value="47" />
      <StatCard title="On Leave" src="app/leave.png" value="3" />
    </div>
  );
}

function StatCard({
  title,
  value,
  status,
  src,
}: {
  title: string;
  value: string;
  status?: boolean;
  src?: string;
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border">
      {/* Image added here */}
      {src && (
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-lg mr-3">
            <img 
              src={src} 
              alt={title}
              className="w-5 h-5" 
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `
                  <div class="w-5 h-5 bg-blue-200 rounded flex items-center justify-center">
                    <span class="text-blue-600 text-xs font-semibold">${title.charAt(0)}</span>
                  </div>
                `;
              }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      )}
      
      {!src && (
        <p className="text-sm text-muted-foreground">{title}</p>
      )}
      
      <h3 className="text-lg font-semibold mt-1">{value}</h3>
      {status && (
        <p className="text-sm text-green-600 mt-1">Connected</p>
      )}
    </div>
  );
}