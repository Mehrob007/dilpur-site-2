"use client";
import SelectType from "@/components/element/SelectType";
import { optionSort } from "@/constants/select";
import { useGlobalState } from "@/store/globalState";
import { sizeT, TypesProductHeaderT } from "@/types/product";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import arrow1Icon from "@/../public/icons/arrow-1.svg";
import { GetSizeREQ } from "@/api/product/size";
import { GetTypeREQ } from "@/api/type/type";
import { GetCategoryREQ } from "@/api/product/category";

export default function TypesProductHeader({ type }: TypesProductHeaderT) {
  const pathName = usePathname();
  const { setClearSearch } = useGlobalState();
  const router = useRouter();
  const [size, setSize] = useState<sizeT[] | []>([]);
  const [types, setTypes] = useState<sizeT[] | []>([]);
  const [category, setCategory] = useState<sizeT[] | []>([]);

  const getDataSize = async () => {
    try {
      const res = await GetSizeREQ({});
      setSize(res.data);
    } catch (e) {
      console.log(e);
      setSize([]);
    }
  };
  const getDataType = async () => {
    try {
      const res = await GetTypeREQ({});
      setTypes(res.data);
    } catch (e) {
      console.log(e);
      setTypes([]);
    }
  };

  const getDataCategory = async () => {
    try {
      const res = await GetCategoryREQ({});
      setCategory(res.data);
    } catch (e) {
      console.log(e);
      setCategory([]);
    }
  };

  useEffect(() => {
    getDataSize();
    getDataType();
    getDataCategory();
  }, []);

  if (type === "filter") {
    return (
      <div className="types-product-header filter">
        <SelectType
          options={types.map((e) => ({ label: e.name, value: String(e.id) }))}
          placeholder="Тип"
          style={{}}
          className="types-select"
          id="type-filter"
        />
        <SelectType
          id="category-filter"
          options={category.map((e) => ({
            label: e.name,
            value: String(e.id),
          }))}
          placeholder="Категория"
          className="categorys-select"
        />
        <SelectType
          id="size-filter"
          options={size.map((e) => ({ label: e.name, value: String(e.id) }))}
          placeholder="Размер"
          className="sizes-select"
        />
        <SelectType
          id="sort-filter"
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
