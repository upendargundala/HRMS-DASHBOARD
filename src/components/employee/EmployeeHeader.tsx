type Props = {
  activeTab: "overview" | "payroll";
  setActiveTab: (tab: "overview" | "payroll") => void;
};

export default function EmployeeHeader({ activeTab, setActiveTab }: Props) {
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="flex items-center gap-4">
        <img
          src="/profile.png"
          alt="employee"
          className="w-20 h-20 rounded-full shrink-0 object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">Pillalamarrri Varun</h2>
          <p className="text-gray-500">UI/UX Designer</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 border-b">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-2 ${
              activeTab === "overview"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab("payroll")}
            className={`pb-2 ${
              activeTab === "payroll"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Payroll
          </button>
        </div>

        
        
        {activeTab === "payroll" && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Download Payslip
          </button>
        )}
      </div>
    </div>
  );
}
