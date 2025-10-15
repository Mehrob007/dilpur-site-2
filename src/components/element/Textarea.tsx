import { InputT } from "@/types/elements";
import { useState } from "react";

export default function Textarea({
  id,
  value = "",
  onChange,
  placeholder,
  title,
  errors,
}: InputT) {
  const [focus, setFocus] = useState(false);
  return (
    <label htmlFor={id} className="input">
      {title && (
        <span className={value?.length ? "" : !focus ? "input-placeholder" : ""}>
          {title}
        </span>
      )}
      <textarea
        onFocus={setFocus.bind(null, true)}
        onBlur={setFocus.bind(null, false)}
        id={id}
        value={value ?? ""}
        // placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
      <p style={{ opacity: errors?.[id] ? 1 : 0 }}>{errors?.[id]}</p>
    </label>
  );
}
