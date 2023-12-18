import React from "react";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Products = () => {
  const fetchProducts = () => {
    return axios.get(`https://api.escuelajs.co/api/v1/products`);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["fetchProducts"],
    queryFn: fetchProducts,
    // cacheTime: 2000,
    // refetchOnMount: false,
    // refetchOnWindowFocus: true,
    // staleTime: 2000,
    // enabled: false,
  });

  if (isError) {
    return <h2>Error Occurred: {error.message}</h2>;
  }

  return (
    <>
      {"Products List"}

      {isLoading && <h2>Loading.............</h2>}

      {data?.data.map((item, index) => (
        <div key={index}>
          <Link to={`/product/${item.id}`}>
            Id:{item.id} Name:{item.title}
          </Link>
        </div>
      ))}
    </>
  );
};

export default Products;
