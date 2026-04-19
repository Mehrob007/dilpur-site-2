"use client";
import { options, SelectT } from "@/types/select";
import React, { useEffect, useState } from "react";
import arrowBottom from "../../../public/icons/arrowBottom.svg";
import Image from "next/image";
import { useGlobalState } from "@/store/globalState";

export default function Select({
  options,
  onChange,
  placeholder,
  style,
  id,
}: SelectT) {
  const [value, setValue] = useState<options | null>(null);
  const { setOpenModalKey, checkKeyModal } = useGlobalState();

  useEffect(() => {
    if (value && onChange) onChange(value.value);
  }, [value, onChange]);

  return (
    <div className="select" style={style}>
      <div
        className="select-header"
        onClick={() =>
          checkKeyModal(id) ? setOpenModalKey("") : setOpenModalKey(id)
        }
      >
        <label className={value ? "active-select-header" : ""}>
          {placeholder}
        </label>
        <span>
          {value ? <span>{value.label}</span> : placeholder}{" "}
          <Image src={arrowBottom} alt="arrowBottom" width={8} height={12} />
        </span>
      </div>
      <div
        className={`select-content ${
          checkKeyModal(id) ? "select-content-open" : ""
        }`}
      >
        {options.map((e, i) => (
          <div
            key={i}
            onClick={() => {
              setValue(e);
              setOpenModalKey("");
            }}
          >
            {e.label}
          </div>
        ))}
      </div>
    </div>
  );
}
