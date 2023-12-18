import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const RqdataTransformation = () => {
  const fetchPersonData = () => {
    return axios.get(`http://localhost:4000/data`);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["fetchData"],
    queryFn: fetchPersonData,
    select: (data) => {
      // const companyNames = data.data.map((data) => data.company);
      // return companyNames;

      const transformedData = data?.data.map(({ name, company }) => ({
        name,
        company,
      }));

      return transformedData;
    },
  });

  if (isError) {
    return <h2>Error Occurred: {error.message}</h2>;
  }

  console.log(data);
  return (
    <>
      {"React Query Data "}

      {isLoading && <h2>Loading.............</h2>}
      <h2>{"Fetching only company names using data transformation"}</h2>
      fetching only company names using data tr

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

export default RqdataTransformation;
