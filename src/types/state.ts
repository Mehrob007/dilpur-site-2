import { sizeT } from "./product";
import { shopT } from "./shop";

export interface defItemT {
  id: number;
  name: string;
}

export interface defObjT {
  [key: string]:
    | string
    | number
    | string[]
    | number[]
    | FileList
    | File
    | boolean
    | { id: number; size: sizeT; count: number }[];
}

export interface StoreState {
  propertys: number[];
  updatePropertys: (ids: number[]) => void;
  setProperty: (ids: number) => void;
  deleteProperty: (ids: number) => void;
}

export interface searchArrT {
  key: string;
  value: string;
}

export interface globalStateT {
  searchArr: searchArrT[];
  setSearchArr: (obj: searchArrT) => void;

  basketItems: {
    id: number;
    size: sizeT;
    count: number;
    cost: number;
    preCost?: number;
    isGiftCard?: boolean;
    nominal?: string;
    shopName?: string;
  }[];
  setBasketItems: (
    obj: {
      id: number;
      size: sizeT;
      count: number;
      cost: number;
      preCost?: number;
      isGiftCard?: boolean;
      nominal?: string;
      shopName?: string;
    }[]
  ) => void;

  type: defItemT[];
  setType: (type: defItemT[]) => void;

  shopItem: shopT | null;
  setShopItem: (shopItem: shopT) => void;

  setRemuveSearch: (item: string) => void;
  setClearSearch: () => void;
  openModalKey: string;
  setOpenModalKey: (key: string) => void;
  checkKeyModal: (key: string) => boolean;
}

export interface dataT {
  [key: string]: string | number | FileList | string[] | File;
}
