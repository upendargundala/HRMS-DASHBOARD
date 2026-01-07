import jsPDF from "jspdf";

type PayslipProps = {
  month: string;
  salary: number;
  deductions: number;
  bonus: number;
  employeeName: string;
  role: string;
};

export const generatePayslip = ({
  month,
  salary,
  deductions,
  bonus,
  employeeName,
  role,
}: PayslipProps) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Payslip", 90, 20);

  doc.setFontSize(12);
  doc.text(`Employee Name: ${employeeName}`, 20, 40);
  doc.text(`Role: ${role}`, 20, 50);
  doc.text(`Month: ${month}`, 20, 60);

  doc.line(20, 65, 190, 65);

  doc.text(`Basic Salary: ₹${salary}`, 20, 80);
  doc.text(`Deductions: ₹${deductions}`, 20, 90);
  doc.text(`Bonus: ₹${bonus}`, 20, 100);

  doc.line(20, 110, 190, 110);

  doc.text(
    `Net Pay: ₹${salary - deductions + bonus}`,
    20,
    125
  );

  doc.save(`Payslip-${month}.pdf`);
};
