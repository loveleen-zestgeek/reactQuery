import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const RqPaginated = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const fetchPersonData = () => {
    return axios.get(`http://localhost:4000/data?limit=6&_page=${pageNumber}`);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["fetchData", pageNumber],
    queryFn: () => fetchPersonData(pageNumber),
  });

  if (isError) {
    return <h2>Error Occurred: {error.message}</h2>;
  }

  return (
    <>
      {"ReactQuery Paginated Data "}

      {isLoading && <h2>Loading.............</h2>}

      {data?.data.map((item, index) => (
        <div key={index}>
          <h3>Id:{item.id}</h3>

          <h3>Name:{item.name}</h3>
          <h3>Company:{item.company}</h3>
        </div>
      ))}

      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>

        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 6}
        >
          Next Page
        </button>
      </div>
    </>
  );
};

export default RqPaginated;
