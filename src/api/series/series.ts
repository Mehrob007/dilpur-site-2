import apiClient from "@/utils/apiClient";

export const GetSeriesByIdREQ = async ({ Id }: { Id?: number }) => {
  try {
    const res = await apiClient(`series/${Id}`, {
        params: {
            id: Id
        }
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
