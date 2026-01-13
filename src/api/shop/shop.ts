import apiClient from "@/utils/apiClient";

export const GetShopREQ = async () => {
  try {
    const res = await apiClient(`shops`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
