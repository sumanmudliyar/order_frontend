import { useQuery } from "react-query";
import axiosInstance from "../../utilities/axiosInstance";

const getAllOrders = async (status: any) => {
  const response = await axiosInstance.get(
    `/order/allOrders?deliveryStatus=${status}`
  );
  return response.data;
};

export const useFetchAllOrderForPartner = (status: any) => {
  return useQuery(["getAllOrdersForPartner", status], () =>
    getAllOrders(status)
  );
};
