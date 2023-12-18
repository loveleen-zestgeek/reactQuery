import React from "react";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const RqProductDetails = () => {
  const { id } = useParams();
  const fetchProductDetails = () => {
    return axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["fetchProductDetails", id],
    queryFn: fetchProductDetails,
    // cacheTime: 2000,
    // refetchOnMount: false,
    // refetchOnWindowFocus: true,
    // staleTime: 2000,

    enabled:false
    // enabled: false,
  });

  if (isError) {
    return <h2>Error Occurred: {error.message}</h2>;
  }

  return (
    <>
      {isLoading && <h2>Loading.............</h2>}

      {data && (
        <div>
          <p>ID: ${data.data.id}</p>
          <p>Title: ${data.data.title}</p>
          <p>Price: $${data.data.price}</p>
          <p>Description: ${data.data.description}</p>
          <div>
            <p>Category:</p>
            <ul>
              <li>ID: ${data.data.category.id}</li>
              <li>Name: ${data.data.category.name}</li>
              <li>
                Image:{" "}
                <img src={`${data.data.category.image}" alt="Category Image`} />
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default RqProductDetails;
