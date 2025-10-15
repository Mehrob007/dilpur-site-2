import { InputT } from "@/types/elements";
import React, { ChangeEvent, useState } from "react";
import ReactInputMask from "@mona-health/react-input-mask";

export default function Input({
  id,
  value = "",
  onChange,
  placeholder,
  title,
  errors,
  type = "text",
}: InputT) {
  const [focus, setFocus] = useState(false);
  const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const cleanPhone = event.target.value.replace(/\D/g, "");
    onChange(cleanPhone);
  };

  return (
    <label
      htmlFor={id}
      className={`input ${
        type === "phone" &&
        (value.length ? "input-phone" : focus ? "input-phone" : "")
      } ${errors?.[id] ? "input-error" : ""}`}
    >
      {title && (
        <span className={value.length ? "" : focus ? "" : "input-placeholder"}>
          {title}
        </span>
      )}
      {type === "phone" ? (
        <ReactInputMask
          mask="99-999-99-99"
          maskChar="___"
          value={value}
          onChange={handleSubmit}
          type="tel"
          title="Телефон"
          id="phone-input"
          className="form-control"
          // placeholder={!focus ? "Телефон" : ""}
          onFocus={setFocus.bind(null, true)}
          onBlur={setFocus.bind(null, false)}
          required
        />
      ) : (
        <input
          onFocus={setFocus.bind(null, true)}
          onBlur={setFocus.bind(null, false)}
          id={id}
          type={type}
          value={value ?? ""}
          // placeholder={!focus ? placeholder : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      <p style={{ opacity: errors?.[id] ? 1 : 0 }}>{errors?.[id]}</p>
    </label>
  );
}
