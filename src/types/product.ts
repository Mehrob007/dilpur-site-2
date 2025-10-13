import { StaticImageData } from "next/image";
import React from "react";

export interface TypesProductHeaderT {
  type: null | "filter" | "showAll" | "goBack";
}

export interface ProductItemsT extends TypesProductHeaderT {
  title: string;
  Limit?: number;
  pagination?: boolean;
  TypeIds?: number[];
}
export interface detailsT {
  details?: null | { discount: number } | "new";
}

export interface ProductItemT extends detailsT {
  id: number;
  img: string[];
  title: string;
  subTitle: string;
  price: number;
  discount?: number;
  property?: boolean;
  compound?: string[];
  description?: string;
  structure?: string;
  colors?: string[] | StaticImageData[];
  article?: string;
  colorProduct?: string;
  sizeIds?: number[];
  size?: sizeT;
  color?: string;
  count?: 0;
  products?: { id: number; size: sizeT; count: number }[];
}
export interface sizeT {
  name: string;
  id?: number;
}

export interface ItemT {
  [key: string]: string | number | StaticImageData | { name: string };
}
export interface HeaderProduct {
  name: string;
}
export interface ProductT {
  item: ItemT;
  styleProduct?: { [key: string]: string | number };
  renderItems?: renderItem[];
  editItem: (id: number) => void;
  deleteItem: (id: number) => void;
  styles: { [key: string]: string };
}

export interface renderItem {
  renderFn: (value: ItemT) => React.ReactNode;
}

export interface ProductsT {
  header?: HeaderProduct[];
  items: ItemT[];
  styles?: { [key: string]: string };
  editItem: (id: number) => void;
  deleteItem: (id: number) => void;
  styleHeader?: { [key: string]: string };
  styleProduct?: { [key: string]: string };
  renderItems?: renderItem[];
  fetching: boolean;
  valueSearch: string;
  setFetching: (value: boolean) => void;
  setPage: (value: number) => void;
  page: number;
}

export interface defDataT {
  name: string;
  id: number;
}
export interface typesDataT {
  сlothing: defDataT[];
  shoes: defDataT[];
  accessories: defDataT[];
}
