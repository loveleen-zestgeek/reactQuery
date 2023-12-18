import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPersonData = () => {
  return axios.get(`http://localhost:4000/data`);
};

export const useCompanyFetchedData = (handleSuccess, handleError) => {
  return useQuery({
    queryKey: ["fetchData"],
    queryFn: fetchPersonData,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};
