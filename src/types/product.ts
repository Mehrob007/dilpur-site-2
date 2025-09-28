import { StaticImageData } from "next/image";

export interface TypesProductHeaderT {
  type: null | "filter" | "showAll" | "goBack";
}

export interface ProductItemsT extends TypesProductHeaderT {
  title: string;
  getURl: string;
  limit?: number;
  pagination?: boolean;
}
export interface detailsT {
  details?: null | { discount: number } | "new";
}

export interface ProductItemT extends detailsT {
  id: number;
  img: string[] | StaticImageData[];
  title: string;
  subTitle: string;
  price: number;
  discount?: number;
  property?: boolean;
  compound?: string[];
  description?: string;
  colors?: string[] | StaticImageData[];
  article?: string;
  sizeIds?: number[];
  size?: sizeT;
}
export interface sizeT {
  name: string;
}
