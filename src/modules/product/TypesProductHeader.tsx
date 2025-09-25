"use client"
import SelectType from "@/components/element/SelectType";
import { optionSort, optionTypes } from "@/constants/select";
import { useGlobalState } from "@/store/globalState";
import { TypesProductHeaderT } from "@/types/product";
import React from "react";

export default function TypesProductHeader({ type }: TypesProductHeaderT) {
  const { setClearSearch } = useGlobalState()
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
        <button>Смотреть все</button>
      </div>
    );
  } else {
    return;
  }
}
