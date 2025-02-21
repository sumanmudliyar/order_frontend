import { useQuery } from "react-query";
import axiosInstance from "../../utilities/axiosInstance";

const getAllProduct = async () => {
  const response = await axiosInstance.get(`/product/getallproduct`);
  return response.data;
};

export const useFetchAllProduct = () => {
  return useQuery(["getAllProduct"], () => getAllProduct());
};
