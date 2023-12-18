import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useCompanyFetchedData } from "../hooks/useData";

const RqUsingCustomQueryHook = () => {
  const handleSuccess = (data) => {
    console.log("performing side effects on success", data);
    // Additional side effects on success if needed
  };

  const handleError = (error) => {
    console.error("Error occurred:", error);
    console.log("performing side effects after occurring an error");
    // Additional side effects on error if needed
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useCompanyFetchedData(handleSuccess, handleError);

  if (isError) {
    return <h2>Error Occurred: {error.message}</h2>;
  }

  console.log(data);
  return (
    <>
      {"React Query Data "}

      {isLoading && <h2>Loading.............</h2>}
      <h2>{"Fetching only company names using data transformation"}</h2>

      {/* When we only want to fetch the comapny data */}
      {/* {data?.map((company, index) => (
        <div key={index}>
          <h3>Company:{company}</h3>
        </div>
      ))} */}

      {/* when we want to fetch names and company data */}

      {data?.map((item, index) => (
        <div key={index}>
          <h3>Name:{item.name}</h3>
          <h3>Company:{item.company}</h3>
          <hr />
        </div>
      ))}
    </>
  );
};

export default RqUsingCustomQueryHook;
