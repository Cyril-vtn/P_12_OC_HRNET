import { useState, useEffect, useRef } from "react";
import "../styles/datePicker.css";

const DatePicker = ({ value, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    value instanceof Date ? value.toISOString().split("T")[0] : value
  );
  const [currentDate, setCurrentDate] = useState(
    value instanceof Date ? value : new Date(value || Date.now())
  );
  const datePickerRef = useRef(null);

  const formatDateInput = (input) => {
    // Remove any non-digit characters
    const numbers = input.replace(/\D/g, "");
    const previousValue = inputValue;

    // If we're deleting characters, handle differently
    if (input.length < previousValue.length) {
      // Keep hyphens only if necessary
      let formatted = numbers;
      if (formatted.length > 4) {
        formatted = formatted.slice(0, 4) + "-" + formatted.slice(4);
        if (formatted.length > 7) {
          formatted = formatted.slice(0, 7) + "-" + formatted.slice(7);
        }
      }
      return formatted;
    }

    let formatted = "";
    let year = numbers.slice(0, 4);
    let month = numbers.slice(4, 6);
    let day = numbers.slice(6, 8);

    // Format year
    if (year.length > 0) {
      formatted += year;
      if (year.length === 4 && numbers.length > 4) formatted += "-";
    }

    // Format month
    if (year.length === 4 && month.length > 0) {
      let monthNum = parseInt(month);
      if (monthNum > 12) month = "12";
      formatted += month;
      if (month.length === 2 && numbers.length > 6) formatted += "-";
    }

    // Format day
    if (month.length === 2 && day.length > 0) {
      let dayNum = parseInt(day);
      const maxDays = new Date(parseInt(year), parseInt(month), 0).getDate();
      if (dayNum > maxDays) day = maxDays.toString();
      formatted += day;
    }

    return formatted;
  };

  const validateDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const handleInputChange = (e) => {
    const formatted = formatDateInput(e.target.value);
    setInputValue(formatted);

    // Update calendar while typing
    if (formatted.length >= 4) {
      const year = parseInt(formatted.slice(0, 4));
      let month = 0;
      let day = 1;

      if (formatted.length >= 7) {
        month = parseInt(formatted.slice(5, 7)) - 1;
      }

      if (formatted.length === 10) {
        day = parseInt(formatted.slice(8, 10));
      }

      const newDate = new Date(year, month, day);
      setCurrentDate(newDate);

      // If date is complete and valid
      if (formatted.length === 10 && validateDate(formatted)) {
        onChange({ target: { name, value: formatted } });
        setIsOpen(true); // Keep calendar open to see selection
      }
    }
  };

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
    const formattedDate = newDate.toISOString().split("T")[0];
    setInputValue(formattedDate);
    onChange({ target: { name, value: formattedDate } });
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
      )
        .toISOString()
        .split("T")[0];

      // Check if this day is the selected date
      const isSelected = dateToCompare === inputValue;

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

  return (
    <div className="date-picker" ref={datePickerRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={() => !isOpen && setIsOpen(true)}
        placeholder="YYYY-MM-DD"
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

export default DatePicker;
