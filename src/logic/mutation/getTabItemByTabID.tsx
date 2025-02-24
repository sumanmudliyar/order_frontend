import { useMutation } from "react-query";
import axiosInstance from "../../utilities/axiosInstance";

const getTabItem = async (params: [any]) => {
  const [tabid] = params;
  const response = await axiosInstance.post(`/tabs/fooditem/${tabid}`);
  return response.data;
};

export const useFetchTabitemByTab = () => {
  return useMutation(getTabItem);
};
