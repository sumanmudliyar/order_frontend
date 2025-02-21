import { useMutation } from "react-query";
import axiosInstance from "../../utilities/axiosInstance";

const login = async (params: [any, any]) => {
  const [email, password] = params;
  const response = await axiosInstance.post(
    `/user/login?email=${email}&password=${password}`
  );
  return response.data;
};

export const useLogin = () => {
  return useMutation(login);
};
