"use client";
import SelectType from "@/components/element/SelectType";
import { optionSort, optionTypes } from "@/constants/select";
import { useGlobalState } from "@/store/globalState";
import { TypesProductHeaderT } from "@/types/product";
import { useRouter } from "next/navigation";
import React from "react";

export default function TypesProductHeader({ type }: TypesProductHeaderT) {
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
        <button onClick={() => router.push("/male/catalog")}>
          Смотреть все
        </button>
      </div>
    );
  } else {
    return;
  }
}
