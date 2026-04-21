"use client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const gender = localStorage.getItem("gender") || "male";
    redirect("./" + gender);
  }, []);
  return <div>page</div>;
}
