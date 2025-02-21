import { useQuery } from "react-query";
import axiosInstance from "../../utilities/axiosInstance";

const getAllOrders = async (status: any, userid: any) => {
  const response = await axiosInstance.get(
    `/order/getOrderByUser?deliveryStatus=${status}&userid=${userid}`
  );
  return response.data;
};

export const useFetchAllOrder = (status: any, userid: any) => {
  return useQuery(["getAllOrders", status, userid], () =>
    getAllOrders(status, userid)
  );
};
