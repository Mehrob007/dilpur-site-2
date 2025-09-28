import { InputT } from "@/types/elements";
import React from "react";

export default function Textarea({
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
      <textarea
        id={id}
        // type="text"
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
      <p style={{ opacity: errors?.[id] ? 1 : 0 }}>{errors?.[id]}</p>
    </label>
  );
}
