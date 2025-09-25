"use client";
import { SelectT } from "@/types/select";
import React from "react";
import arrowBottom from "../../../public/icons/arrowBottomBlack.svg";
import Image from "next/image";
import checkbox from "@/../public/icons/checkbox.svg";
import checkboxActive from "@/../public/icons/checkboxActive.svg";
import { useGlobalState } from "@/store/globalState";
import { useRouter, useSearchParams } from "next/navigation";

export default function SelectType({
  options,
  placeholder,
  style,
  checkBox = true,
  className,
}: SelectT) {
  const { setSearchArr, setRemuveSearch, setOpenModalKey, checkKeyModal } =
    useGlobalState();
  const searchParams = useSearchParams();
  const router = useRouter();

  const key = className?.split("-")[0] as string;

  const searchId = (e: string) => ({
    key: key,
    value: e,
  });
  const params = new URLSearchParams(searchParams.toString());
  const currentValues = params.getAll(key);

  const toggleParam = (key: string, value: string) => {
    let updatedValues: string[];

    if (currentValues.includes(value)) {
      updatedValues = currentValues.filter((v) => v !== value);
    } else {
      updatedValues = [...currentValues, value];
    }
    params.delete(key);
    updatedValues.forEach((v) => params.append(key, v));

    router.push(`?${params.toString()}`);
  };

  return (
    <div className={`selectType ${className}`} style={style}>
      <div
        className="select-header"
        onClick={() => setOpenModalKey(className as string)}
      >
        <span>
          {placeholder}{" "}
          <Image
            src={arrowBottom}
            alt="arrowBottom"
            style={{
              rotate: checkKeyModal(className as string) ? "-180deg" : "0deg",
            }}
            width={10}
            height={12}
          />
        </span>
      </div>
      {checkKeyModal(className as string) && (
        <div
          className="select-main"
          onClick={() => setOpenModalKey(className as string)}
        ></div>
      )}
      <div
        className={`select-content ${
          checkKeyModal(className as string) ? "select-content-open" : ""
        }`}
      >
        {options.map((e, i) => (
          <div
            key={i}
            onClick={() => {
              if (!currentValues.includes(e.value))
                setSearchArr(searchId(e.value));
              else setRemuveSearch(e.value);
              toggleParam(key, e.value);
              if (!checkBox) setOpenModalKey(className as string);
              // setValue([e.value as string]);
              // setOpenModalKey(false);
            }}
          >
            {checkBox && (
              <Image
                src={
                  currentValues.includes(e.value) ? checkboxActive : checkbox
                }
                alt="checkbox-checkboxActive"
              />
            )}
            <span>{e.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
