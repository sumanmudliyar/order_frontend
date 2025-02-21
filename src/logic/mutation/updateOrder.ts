import { useMutation } from "react-query";
import axiosInstance from "../../utilities/axiosInstance";

const updateOrder = async (params: [any, any]) => {
  const [orderid, body] = params;

  console.log("mutate", body);
  const response = await axiosInstance.put(
    `/order/updateOrder?orderid=${orderid}`,
    body
  );
  return response.data;
};

export const useUpdateOrder = () => {
  return useMutation(updateOrder);
};
