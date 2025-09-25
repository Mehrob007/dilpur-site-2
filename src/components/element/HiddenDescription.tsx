import { DescriptionT } from "@/types/description";
import Image from "next/image";
import React, { useState } from "react";
import plus from "@/../public/icons/plus.svg";

export default function HiddenDescription({
  title,
  description,
}: DescriptionT) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="hidden-description" style={{ gap:  "" }}>
      <header className={open ? "header-active" : ""}>
        <h1>{title}</h1>
        <Image
          onClick={() => setOpen(!open)}
          src={plus}
          alt="plus-img"
          className={open ? "active-plus" : ""}
          width={24}
          height={24}
        />
      </header>
      <div className={`dropdown ${open ? "active" : ""}`}>
        <p>{description}</p>
      </div>
    </div>
  );
}
