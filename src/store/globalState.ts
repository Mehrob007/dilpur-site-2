import { globalStateT, StoreState } from "@/types/state";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
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
    }),
    {
      name: "stor",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
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
  setClearSearch: () => set({ searchArr: [] }),
  openModalKey: "",
  setOpenModalKey: (key) =>
    set((state) => {
      if (state.openModalKey !== key) return { openModalKey: key };
      else return { openModalKey: "" };
    }),
  checkKeyModal: (key) => key === get().openModalKey,
}));
