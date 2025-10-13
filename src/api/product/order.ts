import { defObjT } from "@/types/state";
import apiClient from "@/utils/apiClient";

export const PostOrderREQ = async ({ data }: { data: defObjT }) => {
  try {
    const res = await apiClient.post("orders/", data);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
