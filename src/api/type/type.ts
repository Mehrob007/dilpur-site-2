import apiClient from "@/utils/apiClient";

export const GetTypeREQ = async ({
  Limit,
  Page,
  Id,
  Name,
}: {
  Limit?: number;
  Page?: number;
  Id?: number;
  Name?: string;
}) => {
  try {
    const res = await apiClient("products/type", {
      params: {
        Limit: Limit,
        Page: Page,
        Id: Id,
        Name: Name,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
