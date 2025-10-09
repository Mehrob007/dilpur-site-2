import { dataT } from "@/types/state";
import apiClient from "@/utils/apiClient";

export const CreateCategoryREQ = async (data: dataT) => {
  try {
    const res = await apiClient.post("categories", data);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const EditCategoryREQ = async (data: dataT) => {
  try {
    const res = await apiClient.patch("categories", data);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const GetCategoryREQ = async ({
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
    const res = await apiClient("categories", {
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

export const DeleteCategoryREQ = async (id: number) => {
  try {
    const res = await apiClient.delete("categories?id=" + id);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
