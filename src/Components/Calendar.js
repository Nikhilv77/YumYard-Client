// MyCalendar.jsx

import React, { useState } from "react";
import Calendar from "react-calendar";
import "./MyCalendar.css"; // Import custom styles

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (

      <div>
        <Calendar onChange={onChange} value={date} className="react-calendar" />
      </div>

  );
};

export default MyCalendar;
