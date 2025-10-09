
import { dataT } from "@/types/state";
import apiClient from "@/utils/apiClient";

export const CreateSizeREQ = async (data: dataT) => {
  try {
    const res = await apiClient.post("sizes", data);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const EditSizeREQ = async (data: dataT) => {
  try {
    const res = await apiClient.patch("sizes", data);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const GetSizeREQ = async ({
  Id,
  Page,
  Limit,
  Name,
  TypeId,
}: {
  Id?: number;
  Page?: number;
  Limit?: number;
  Name?: string;
  TypeId?: number;
}) => {
  try {
    const res = await apiClient("sizes", {
      params: {
        Id: Id,
        Page: Page,
        Limit: Limit,
        Name: Name,
        TypeId: TypeId,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const DeleteSizeREQ = async (id: number) => {
  try {
    const res = await apiClient.delete("sizes?id=" + id);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
