import { dataT } from "@/types/state";
import apiClient from "@/utils/apiClient";

export const CreateTypeREQ = async (data: dataT) => {
  try {
    const res = await apiClient.post("products/type", data);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const EditTypeREQ = async (data: dataT) => {
  try {
    const res = await apiClient.patch("products/type", data);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const GetTypeREQ = async ({
  Id,
  Page,
  Limit,
  Name,
}: {
  Id?: number;
  Page?: number;
  Limit?: number;
  Name?: string;
}) => {
  try {
    const res = await apiClient("products/type", {
      params: {
        Id: Id,
        Page: Page,
        Limit: Limit,
        Name: Name,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const DeleteTypeREQ = async (id: number) => {
  try {
    const res = await apiClient.delete("products/type?id=" + id);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
