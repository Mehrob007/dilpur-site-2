"use client";
import { options, SelectT } from "@/types/select";
import React, { useEffect, useState } from "react";
import arrowBottom from "../../../public/icons/arrowBottom.svg";
import Image from "next/image";

export default function Select({
  options,
  onChange,
  placeholder,
  style,
}: SelectT) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<options | null>(null);

  useEffect(() => {
    if (value && onChange) onChange(value.value);
  }, [value]);

  return (
    <div className="select" style={style}>
      <div className="select-header" onClick={() => setOpen(!open)}>
        <label className={value ? "active-select-header" : ""}>
          {placeholder}
        </label>
        <span>
          {value ? <span>{value.label}</span> : placeholder}{" "}
          <Image src={arrowBottom} alt="arrowBottom" width={8} height={12} />
        </span>
      </div>
      <div className={`select-content ${open ? "select-content-open" : ""}`}>
        {options.map((e, i) => (
          <div
            key={i}
            onClick={() => {
              setValue(e);
              setOpen(false);
            }}
          >
            {e.label}
          </div>
        ))}
      </div>
    </div>
  );
}
