import apiClient from "@/utils/apiClient";

const arrayParams = (arr?: number[], key?: string) => {
  if (!Array.isArray(arr) || arr.length === 0) return {};
  return { [key || "error_key"]: arr };
};

export const GetProductREQ = async ({
  Limit,
  Page,
  Id,
  Name,
  TypeIds,
  SizeIds,
  CategoriesIds,
  SeriesId,
  SortType,
  Gender,
}: {
  Limit?: number;
  Page?: number;
  Id?: number;
  Name?: string;
  TypeIds?: number[];
  SizeIds?: number[];
  CategoriesIds?: number[];
  SeriesId?: number;
  SortType?: string;
  Gender?: number;
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
        SeriesId: SeriesId,
        SortType: SortType,
        Gender: Gender,
        ColumnName: "Cost",
        ...productTypeIds,
        ...sizeIds,
        ...categoriesIds,
      },
      paramsSerializer: {
        indexes: null, // this will produce key=val1&key=val2 instead of key[0]=val1
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const GetProductByIdREQ = async ({ id }: { id?: number }) => {
  try {
    const res = await apiClient(`products/template/${id}`);
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
    const res = await apiClient("admin/products/template/1C", {
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
