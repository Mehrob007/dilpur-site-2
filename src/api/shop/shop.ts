const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import apiClient from "@/utils/apiClient";

export const GetShopREQ = async () => {
  try {
    const res = await apiClient(`shops`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const GetShopByIdREQ = async (shopId: number) => {
  try {
    const res = await apiClient(`${BASE_URL}` + shopId);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
