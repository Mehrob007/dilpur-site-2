import { dataT } from "@/types/state";
import apiClient from "@/utils/apiClient";

export const CreateColorREQ = async (data: dataT) => {
  try {
    const res = await apiClient.post("colors", data);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const EditColorREQ = async (data: dataT) => {
  try {
    const res = await apiClient.patch("colors", data);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const GetColorREQ = async ({
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
    const res = await apiClient("colors", {
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

export const DeleteColorREQ = async (id: number) => {
  try {
    const res = await apiClient.delete("colors?id=" + id);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
