// /data/employees.ts
export interface Employee {
  id: string;
  name: string;
  role: string;
  overview: {
    [key: string]: string | number;
  };
  payroll: {
    month: string;
    basic: number;
    deductions: number;
    bonus: number;
    date: string;
    status: "Paid" | "Pending";
  }[];
}

export const employees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    role: "Software Engineer",
    overview: {
      "Employee ID": "EMP001",
      "Department": "Engineering",
      "Join Date": "2023-01-15",
      "Email": "john@company.com",
      "Phone": "+1 (555) 123-4567",
      "Location": "New York",
      "Manager": "Jane Smith",
      "Employment Type": "Full-time"
    },
    payroll: [
      {
        month: "January 2024",
        basic: 5000,
        deductions: 500,
        bonus: 1000,
        date: "2024-01-31",
        status: "Paid"
      },
      {
        month: "February 2024",
        basic: 5000,
        deductions: 500,
        bonus: 800,
        date: "2024-02-29",
        status: "Paid"
      }
    ]
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Engineering Manager",
    overview: {
      "Employee ID": "EMP002",
      "Department": "Engineering",
      "Join Date": "2022-06-10",
      "Email": "jane@company.com",
      "Phone": "+1 (555) 987-6543",
      "Location": "San Francisco",
      "Manager": "Robert Johnson",
      "Employment Type": "Full-time"
    },
    payroll: [
      {
        month: "January 2024",
        basic: 7000,
        deductions: 700,
        bonus: 1500,
        date: "2024-01-31",
        status: "Paid"
      },
      {
        month: "February 2024",
        basic: 7000,
        deductions: 700,
        bonus: 1300,
        date: "2024-02-29",
        status: "Paid"
      }
    ]
  }
];