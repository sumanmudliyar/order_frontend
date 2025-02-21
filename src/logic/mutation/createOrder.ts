import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../utilities/axiosInstance";

const createOrder = async (params: [any]) => {
  const [body] = params;
  const response = await axiosInstance.post(`/order/newOrder`, body);
  return response.data;
};

export const usePostNewOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(createOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("getAllOrders"); // ✅ Invalidate query after success
    },
  });
};
