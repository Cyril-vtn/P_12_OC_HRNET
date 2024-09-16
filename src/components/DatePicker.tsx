import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../styles/DatePicker.css";

const DatePicker = ({ value, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    value instanceof Date ? value : new Date(value || Date.now())
  );
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    onChange({ target: { name, value: newDate.toISOString().split("T")[0] } });
    setIsOpen(false);
  };

  const handleMonthChange = (increment: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1)
    );
  };

  // Add this new function to handle arrow button clicks
  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const increment =
      (e.currentTarget as HTMLButtonElement).textContent === "<" ? -1 : 1;
    handleMonthChange(increment);
  };

  const renderCalendar = () => {
    const days: JSX.Element[] = [];
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const totalDays = daysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push(
        <div key={i} className="day" onClick={() => handleDateClick(i)}>
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="date-picker" ref={datePickerRef}>
      <input
        type="text"
        value={
          value instanceof Date ? value.toISOString().split("T")[0] : value
        }
        onClick={() => setIsOpen(!isOpen)}
        readOnly
      />
      {isOpen && (
        <div className="calendar">
          <div className="calendar-header">
            <button onClick={handleArrowClick}>&lt;</button>
            <span>
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button onClick={handleArrowClick}>&gt;</button>
          </div>
          <div className="calendar-body">
            <div className="weekdays">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="weekday">
                  {day}
                </div>
              ))}
            </div>
            <div className="days">{renderCalendar()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

DatePicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default DatePicker;