import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Rqdata = () => {
  const handleSuccess = () => {
    console.log("performing side effects on success", data);
    // Additional side effects on success if needed
  };

  const handleError = (error) => {
    console.error("Error occurred:", error);
    console.log("performing side effects after occurring an error");
    // Additional side effects on error if needed
  };

  const fetchPersonData = () => {
    return axios.get(`http://localhost:4000/data`);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["fetchData"],
    queryFn: fetchPersonData,
    // cacheTime: 2000,
    // refetchOnMount: false,
    // refetchOnWindowFocus: true,
    // staleTime: 2000,
    // enabled: false,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  if (isError) {
    return <h2>Error Occurred: {error.message}</h2>;
  }

  return (
    <>
      {"React Query Data "}

      <button onClick={refetch}>Click To Fetch Data</button>
      {isLoading && <h2>Loading.............</h2>}

      {data?.data.map((item, index) => (
        <div key={index}>
          <h3>Id:{item.id}</h3>

          <h3>Name:{item.name}</h3>
          <h3>Company:{item.company}</h3>
        </div>
      ))}
    </>
  );
};

export default Rqdata;
