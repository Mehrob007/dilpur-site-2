import { StaticImageData } from "next/image";

export interface BasketItemT {
  title: string;
  subTitle: string;
  size: string;
  color: string;
  count: number;
  price: number;
  img: StaticImageData[] | string[];
  discount?: number
}
