"use client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    redirect("./male");
  }, []);
  return <div>page</div>;
}
