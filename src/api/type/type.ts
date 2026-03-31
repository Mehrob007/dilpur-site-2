import apiClient from "@/utils/apiClient";

export const GetTypeREQ = async ({
  Limit,
  Page,
  Id,
  Name,
  Gender,
}: {
  Limit?: number;
  Page?: number;
  Id?: number;
  Name?: string;
  Gender?: number;
}) => {
  try {
    const res = await apiClient("products/type", {
      params: {
        Limit: Limit,
        Page: Page,
        Id: Id,
        Name: Name,
        Gender: Gender,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
