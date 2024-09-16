import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/CustomSelect.css";

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  name,
  position = "bottom",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option.value } });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value) || {
    label: `Select a ${label.toLowerCase()}`,
  };

  return (
    <div className={`custom-select ${isOpen ? "open" : ""}`} ref={selectRef}>
      <label htmlFor={name}>{label}</label>
      <div className="select-wrapper">
        <div className="select-header" onClick={handleToggle}>
          <span>{selectedOption.label}</span>
          <span className="arrow">{isOpen ? "▲" : "▼"}</span>
        </div>
        {isOpen && (
          <div className={`select-options ${position}`}>
            {options.map((option) => (
              <div
                key={option.value}
                className={`select-option ${
                  value === option.value ? "selected" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.oneOf(["top", "bottom"]),
};

export default CustomSelect;
