import { InputT } from "@/types/elements";
import React from "react";

export default function Input({
  id,
  value = "",
  onChange,
  placeholder,
  title,
  errors,
}: InputT) {
  return (
    <label htmlFor={id} className="input">
      {title && (
        <span className={!value?.length ? "input-placeholder" : ""}>
          {title}
        </span>
      )}
      <input
        id={id}
        type="text"
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <p style={{ opacity: errors?.[id] ? 1 : 0 }}>{errors?.[id]}</p>
    </label>
  );
}
