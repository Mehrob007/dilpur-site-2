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
  setRemuveSearch: (item: string) => void;
  setClearSearch: () => void;
  openModalKey: string;
  setOpenModalKey: (key: string) => void;
  checkKeyModal: (key: string) => boolean;
}
