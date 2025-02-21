import { useQuery } from "react-query";
import axiosInstance from "../../utilities/axiosInstance";

const getClientDetail = async (companyid: number) => {
  const response = await axiosInstance.get(
    `/tabs/allTabs?clientid=${companyid}`
  );
  return response.data;
};

export const useFetchTabByClient = (companyid: number) => {
  return useQuery(["getClientDetail", companyid], () =>
    getClientDetail(companyid)
  );
};
