"use client";
import SelectType from "@/components/element/SelectType";
import { optionSort } from "@/constants/select";
import { useGlobalState } from "@/store/globalState";
import { sizeT, TypesProductHeaderT } from "@/types/product";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import arrow1Icon from "@/../public/icons/arrow-1.svg";
import { GetSizeREQ } from "@/api/product/size";
import { GetTypeREQ } from "@/api/type/type";
import { GetCategoryREQ } from "@/api/product/category";

export default function TypesProductHeader({ type }: TypesProductHeaderT) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { setClearSearch } = useGlobalState();
  const router = useRouter();
  const [size, setSize] = useState<sizeT[] | []>([]);
  const [types, setTypes] = useState<sizeT[] | []>([]);
  const [category, setCategory] = useState<sizeT[] | []>([]);

  const selectedTypes = searchParams.getAll("types");
  const activeTypeId =
    selectedTypes.length > 0
      ? Number(selectedTypes[selectedTypes.length - 1])
      : undefined;

  const getDataSize = useCallback(async (typeId?: number) => {
    try {
      const res = await GetSizeREQ({ TypeId: typeId });
      if (res && res.data) {
        setSize(res.data);
      } else {
        setSize([]);
      }
    } catch (e) {
      console.log(e);
      setSize([]);
    }
  }, []);

  const getDataType = useCallback(async () => {
    try {
      const sender = pathName?.includes("/female") ? 1 : 0;
      const res = await GetTypeREQ({ Gender: sender });
      if (res && res.data) {
        setTypes(res.data);
      } else {
        setTypes([]);
      }
    } catch (e) {
      console.log(e);
      setTypes([]);
    }
  }, [pathName]);

  const getDataCategory = useCallback(async (typeId?: number) => {
    try {
      const res = await GetCategoryREQ({ TypeId: typeId });
      if (res && res.data) {
        setCategory(res.data);
      } else {
        setCategory([]);
      }
    } catch (e) {
      console.log(e);
      setCategory([]);
    }
  }, []);

  useEffect(() => {
    getDataType();
  }, [getDataType]);

  useEffect(() => {
    getDataSize(activeTypeId);
    getDataCategory(activeTypeId);
  }, [activeTypeId, getDataSize, getDataCategory]);

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
          toggle={false}
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
