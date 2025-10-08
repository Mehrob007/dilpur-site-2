import { sizeT } from "./product";

export interface defItemT {
  id: number;
  name: string;
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

  basketItems: { id: number; size: sizeT; count: number }[];
  setBasketItems: (obj: { id: number; size: sizeT; count: number }[]) => void;

  type: defItemT[];
  setType: (type: defItemT[]) => void;

  setRemuveSearch: (item: string) => void;
  setClearSearch: () => void;
  openModalKey: string;
  setOpenModalKey: (key: string) => void;
  checkKeyModal: (key: string) => boolean;
}
