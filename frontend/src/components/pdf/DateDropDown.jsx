import React, { useState, useEffect } from "react";

const DateDropDown = ({ label, onDateChange }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Generate years dynamically
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i <= currentYear + 50; i++) {
    years.push(i);
  }

  // Months array
  const months = [
    { value: "01" }, { value: "02" }, { value: "03" }, { value: "04" },
    { value: "05" }, { value: "06" }, { value: "07" }, { value: "08" },
    { value: "09" }, { value: "10" }, { value: "11" }, { value: "12" }
  ];

  // Days array (1 to 31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Handle changes and pass to the parent component
  useEffect(() => {
    // onDateChange({ day: selectedDay, month: selectedMonth, year: selectedYear });
    onDateChange(`${selectedYear}-${selectedMonth}-${selectedDay}`);

  }, [selectedDay, selectedMonth, selectedYear]);

  return (
    <div className="flex flex-col gap-2">
      <label className={`text-sm text-[#222A59] font-medium`}>{label}</label>
      <div className="flex gap-2">
        {/* Day */}
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className={`w-16 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base ${
            !selectedDay ? "text-[#D0D5DD]" : "text-black"
          }`}
        >
          <option value="" disabled className="text-[#D0D5DD]">DD</option>
          {days.map((day) => (
            <option key={day} value={day} className="text-black">{day}</option>
          ))}
        </select>

        {/* Month */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className={`w-16 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base ${
            !selectedMonth ? "text-[#D0D5DD]" : "text-black"
          }`}
        >
          <option value="" disabled>MM</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>{month.value}</option>
          ))}
        </select>

        {/* Year */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className={`w-28 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base ${
            !selectedYear ? "text-[#D0D5DD]" : "text-black"
          }`}
        >
          <option value="" disabled>YYYY</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateDropDown;
