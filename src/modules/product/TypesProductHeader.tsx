"use client";
import SelectType from "@/components/element/SelectType";
import { optionSort, optionTypes } from "@/constants/select";
import { useGlobalState } from "@/store/globalState";
import { TypesProductHeaderT } from "@/types/product";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import arrow1Icon from "@/../public/icons/arrow-1.svg";

export default function TypesProductHeader({ type }: TypesProductHeaderT) {
  const pathName = usePathname();
  const { setClearSearch } = useGlobalState();
  const router = useRouter();
  if (type === "filter") {
    return (
      <div className="types-product-header filter">
        <SelectType
          options={optionTypes}
          placeholder="Тип"
          style={{}}
          className="types-select"
        />
        <SelectType
          options={optionTypes}
          placeholder="Категория"
          className="categorys-select"
        />
        <SelectType
          options={optionTypes}
          placeholder="Размер"
          className="sizes-select"
        />
        <SelectType
          checkBox={false}
          options={optionSort}
          placeholder="Сортировать по"
          className="sorts-select"
        />
        <p onClick={() => setClearSearch()}>Сбросить фильтры</p>
      </div>
    );
  } else if (type === "showAll") {
    return (
      <div className="types-product-header">
        <button
          onClick={() =>
            router.push("/" + pathName?.split("/")[1] + "/catalog")
          }
        >
          Смотреть все
        </button>
      </div>
    );
  } else if (type === "goBack") {
    return (
      <div className="types-product-header-go-back">
        <label onClick={() => router.push("/" + pathName?.split("/")[1])}>
          <Image src={arrow1Icon} alt="arrow1Icon" />
          ВЕРНУТЬСЯ В МАГАЗИН
        </label>
      </div>
    );
  } else {
    return;
  }
}
