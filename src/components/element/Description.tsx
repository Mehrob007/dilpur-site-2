import { DescriptionT } from "@/types/description";
import React from "react";

export default function Description({ title, description }: DescriptionT) {
  return (
    <div className="description">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
