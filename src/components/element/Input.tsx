import { InputT } from "@/types/elements";
import React, { ChangeEvent } from "react";
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
  const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const cleanPhone = event.target.value.replace(/\D/g, "");
    onChange(cleanPhone);
  };

  return (
    <label
      htmlFor={id}
      className={`input ${type === "phone" ? "input-phone" : ""}`}
    >
      {title && (
        <span className={!value?.length ? "input-placeholder" : ""}>
          {title}
        </span>
      )}
      {type === "phone" ? (
        <ReactInputMask
          mask="(99) 999-99-99"
          maskChar="___"
          value={value}
          onChange={handleSubmit}
          type="tel"
          id="phone-input"
          className="form-control"
          placeholder="(XX) XXX-XX-XX"
          required
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      <p style={{ opacity: errors?.[id] ? 1 : 0 }}>{errors?.[id]}</p>
    </label>
  );
}
