import apiClient from "@/utils/apiClient";

const arrayParams = (arr?: number[], key?: string) => {
  if (!Array.isArray(arr)) return;
  let obj: { [key: string]: number } = {};
  arr.map((e) => {
    obj = { ...obj, [key || "error_key"]: e };
  });
  return obj;
};

export const GetProductREQ = async ({
  Limit,
  Page,
  Id,
  Name,
  TypeIds,
  SizeIds,
  CategoriesIds,
}: {
  Limit?: number;
  Page?: number;
  Id?: number;
  Name?: string;
  TypeIds?: number[];
  SizeIds?: number[];
  CategoriesIds?: number[];
}) => {
  try {
    const productTypeIds = arrayParams(TypeIds, "productTypeIds");
    const sizeIds = arrayParams(SizeIds, "sizeIds");
    const categoriesIds = arrayParams(CategoriesIds, "CategoriesIds");

    const res = await apiClient("products/template", {
      params: {
        Limit: Limit,
        Page: Page,
        Id: Id,
        Name: Name,
        ...productTypeIds,
        ...sizeIds,
        ...categoriesIds,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const Get1CREQ = async ({
  Limit,
  Page,
  Id,
  numenclature,
  Name,
}: {
  Limit?: number;
  Page?: number;
  Id?: number;
  Name?: string;
  numenclature?: string;
}) => {
  try {
    const res = await apiClient("api/admin/products/template/1C", {
      params: {
        Limit: Limit,
        Page: Page,
        Id: Id,
        Name: Name,
        numenclature: numenclature,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
