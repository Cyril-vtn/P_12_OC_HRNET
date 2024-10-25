import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../styles/datePicker.css";

const DatePicker = ({ value, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Initialize currentDate with the provided value or current date
  const [currentDate, setCurrentDate] = useState(
    value instanceof Date ? value : new Date(value || Date.now())
  );
  const datePickerRef = useRef(null);

  // Effect to handle clicking outside the date picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper function to get the number of days in a month
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const handleDateClick = (day) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
      12 // Set to noon to avoid timezone issues
    );
    onChange({ target: { name, value: newDate.toISOString().split("T")[0] } });
    setIsOpen(false);
  };

  const handleMonthChange = (increment) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1)
    );
  };

  const handleArrowClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const increment = e.currentTarget.textContent === "<" ? -1 : 1;
    handleMonthChange(increment);
  };

  const renderCalendar = () => {
    const days = [];
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const totalDays = daysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    // Render each day of the month
    for (let i = 1; i <= totalDays; i++) {
      const dateToCompare = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i,
        12
      );
      const valueDate =
        value instanceof Date
          ? new Date(value.getFullYear(), value.getMonth(), value.getDate(), 12)
          : null;

      // Check if this day is the selected date
      const isSelected =
        valueDate && dateToCompare.getTime() === valueDate.getTime();

      days.push(
        <div
          key={i}
          className={`day ${isSelected ? "selected" : ""}`}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  // Handle input click to open/close the calendar
  const handleInputClick = () => {
    if (!isOpen) {
      // Update currentDate when opening the calendar
      setCurrentDate(
        value instanceof Date ? value : new Date(value || Date.now())
      );
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="date-picker" ref={datePickerRef}>
      <input
        type="text"
        value={
          value instanceof Date ? value.toISOString().split("T")[0] : value
        }
        onClick={handleInputClick}
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
