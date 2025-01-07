import React from "react";
import { Card, Input, Typography } from "@material-tailwind/react";

const NextVisit = ({
  durationValue,
  setDurationValue,
  durationUnit,
  setDurationUnit,
  nextVisitDate,
  setNextVisitDate,
  nextVisitTime,
  setNextVisitTime,
}) => {
  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    if (selectedDate < new Date()) {
      alert("Next visit date cannot be in the past");
      return;
    }
    setNextVisitDate(event.target.value);
  };

  return (
    <Card className="p-6 w-full h-full shadow-lg">
      <Typography variant="h4" className="font-semibold text-gray-800 mb-4">
        Next Visit
      </Typography>
      <div className="grid grid-cols-1 gap-4">
        <Input
          type="number"
          label="Duration"
          value={durationValue}
          onChange={(e) => setDurationValue(e.target.value)}
        />
        <select
          value={durationUnit}
          onChange={(e) => setDurationUnit(e.target.value)}
          className="border border-gray-300 rounded px-2 py-2"
        >
          <option value="Days">Days</option>
          <option value="Weeks">Weeks</option>
          <option value="Months">Months</option>
        </select>
        <Input
          type="date"
          label="Next Visit Date"
          value={nextVisitDate}
          onChange={handleDateChange}
        />
        <Input
          type="time"
          label="Next Visit Time"
          value={nextVisitTime}
          onChange={(e) => setNextVisitTime(e.target.value)}
        />
      </div>
    </Card>
  );
};

export default NextVisit;
