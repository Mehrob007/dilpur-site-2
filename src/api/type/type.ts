import apiClient from "@/utils/apiClient";

export const GetTypeREQ = async ({
  Limit,
  Page,
  Id,
  Name,
  Sex,
}: {
  Limit?: number;
  Page?: number;
  Id?: number;
  Name?: string;
  Sex?: number;
}) => {
  try {
    const res = await apiClient("products/type", {
      params: {
        Limit: Limit,
        Page: Page,
        Id: Id,
        Name: Name,
        Sex: Sex,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
