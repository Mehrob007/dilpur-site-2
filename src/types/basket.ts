import { StaticImageData } from "next/image";

export interface BasketItemT {
  id: number
  title: string;
  subTitle: string;
  size: string;
  color: string;
  count: number;
  price: number;
  img: StaticImageData[] | string[];
  discount?: number;
  deleteBasketItem: (id: number) => void;
}
