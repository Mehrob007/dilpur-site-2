import { sizeT } from "./product";

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

  basketItems: { id: number; size: sizeT }[];
  setBasketItems: (obj: { id: number; size: sizeT }[]) => void;

  setRemuveSearch: (item: string) => void;
  setClearSearch: () => void;
  openModalKey: string;
  setOpenModalKey: (key: string) => void;
  checkKeyModal: (key: string) => boolean;
}
