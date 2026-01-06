import { globalStateT, StoreState } from "@/types/state";
import { create } from "zustand";

export const useStore = create<StoreState>((set, get) => ({
  propertys: [],
  updatePropertys: (ids) => set({ propertys: ids }),
  setProperty: (id) => {
    const prop = get().propertys;
    const findId = prop.includes(id);
    if (!findId) set({ propertys: [...prop, id] });
  },
  deleteProperty: (id) => {
    const prop = get().propertys;
    set({ propertys: prop.filter((e) => e !== id) });
  },
}));
export const useGlobalState = create<globalStateT>((set, get) => ({
  searchArr: [],
  setSearchArr: (obj) =>
    set((state) => ({
      searchArr: [...state.searchArr, obj],
    })),
  basketItems: [],
  setBasketItems: (obj) =>
    set(() => ({
      basketItems: obj,
    })),
  type: [],
  setType: (obj) =>
    set({
      type: obj,
    }),
  setRemuveSearch: (field) =>
    set((state) => ({
      searchArr: state.searchArr.filter((e) => e.value !== field),
    })),
  setClearSearch: () => {
    set({ searchArr: [] });
    const params = new URLSearchParams(window.location.search);
    params.delete("name");
    params.delete("sizes");
    params.delete("types");
    params.delete("categorys");
    params.delete("sorts");
    const newPath = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newPath);
  },
  openModalKey: "",
  setOpenModalKey: (key) =>
    set((state) => {
      if (state.openModalKey !== key) return { openModalKey: key };
      else return { openModalKey: "" };
    }),
  checkKeyModal: (key) => key === get().openModalKey,
}));
