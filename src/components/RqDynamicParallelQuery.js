import React from "react";
import axios from "axios";
import { useQueries, useQuery } from "@tanstack/react-query";

const RqDynamicParallelQuery = () => {
  //fetching all products ID*************************************
  const fetchproductsId = () => {
    return axios.get(`https://fakestoreapi.com/products`);
  };
  const productsIdData = useQuery({
    queryKey: ["fetchproductsId"],
    queryFn: fetchproductsId,
  });

  const productsIdArr = (productsIdData?.data?.data ?? []).map(
    (item) => item.id
  );

  //fetching product description using products ID*************************************
  const fetchProductsData = (id) => {
    return axios.get(`https://fakestoreapi.com/products/${id}`);
  };

  const queryResults = useQueries({
    queries: productsIdArr.map((id) => {
      return {
        queryKey: ["fetchProductsData", id],
        queryFn: () => fetchProductsData(id),
        enabled: !!productsIdData, //Dependent Query
      };
    }),
  });

  return (
    <>
      {"Dynamic Parallel Query"}
      {queryResults.isLoading ||
        (queryResults.isLoading && <h2>Loading.............</h2>)}

      {queryResults?.map((item, index) => (
        <div key={index}>
          <p>category: ${item?.data?.data?.category}</p>
          <p>title: ${item?.data?.data?.title}</p>
          <p>price: $${item?.data?.data?.price}</p>
          <p>description: ${item?.data?.data?.description}</p>
        </div>
      ))}
    </>
  );
};

export default RqDynamicParallelQuery;
