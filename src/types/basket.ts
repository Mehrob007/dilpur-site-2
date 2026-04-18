import { sizeT } from "./product";

export interface BasketItemT {
  id: number;
  size: sizeT;
  deleteBasketItem: (id: number) => void;
  count: number;
  order?: boolean;
  getPrice: (priceItme: number) => void;
  setSkitka: (price: number) => void;
}
