import { useQuery } from "react-query";
import axiosInstance from "../../utilities/axiosInstance";

const getOrders = async (orderid: any) => {
  const response = await axiosInstance.get(
    `/order/getOrder?orderid=${orderid}`
  );
  return response.data;
};

export const useFetchOrder = (orderid: any) => {
  return useQuery(["getOrders", orderid], () => getOrders(orderid));
};
