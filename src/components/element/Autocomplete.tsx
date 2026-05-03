import { AutocompleteT } from "@/types/elements";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";

export default function Autocomplete({
  id,
  value = "",
  onChange,
  placeholder,
  title,
  errors,
  options = [],
}: AutocompleteT) {
  const [focus, setFocus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleSelectOption = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`input autocomplete-container ${errors?.[id] ? "input-error" : ""}`}
    >
      {title && (
        <span
          className={
            value.length || focus ? "" : "input-placeholder"
          }
        >
          {title}
        </span>
      )}
      <input
        onFocus={() => {
          setFocus(true);
          setIsOpen(true);
        }}
        id={id}
        type="text"
        value={value ?? ""}
        placeholder={!focus ? placeholder : ""}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <div
        className={`select-content ${
          isOpen && filteredOptions.length > 0 ? "select-content-open" : ""
        }`}
        style={{ width: "100%" }}
      >
        {filteredOptions.map((option, index) => (
          <div
            key={index}
            className="autocomplete-option"
            onClick={() => handleSelectOption(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <p style={{ opacity: errors?.[id] ? 1 : 0 }}>{errors?.[id]}</p>
    </div>
  );
}
