import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const RqParallelQuery = () => {
  const fetchPersonData = () => {
    return axios.get(`http://localhost:4000/data`);
  };

  const fetchFoodItemsData = () => {
    return axios.get(`http://localhost:4000/foodItems`);
  };

  const personalData = useQuery({
    queryKey: ["fetchPersonData"],
    queryFn: fetchPersonData,
  });

  const foodItemsData = useQuery({
    queryKey: ["fetchFoodItemsData"],
    queryFn: fetchFoodItemsData,
  });

  if (personalData.isError) {
    return <h2>Error Occurred: {personalData.error.message}</h2>;
  }

  return (
    <>
      {"React Query Data "}

      {personalData.isLoading ||
        (foodItemsData.isLoading && <h2>Loading.............</h2>)}

      {personalData.data?.data.map((item, index) => (
        <div key={index}>
          <h3>Id:{item.id}</h3>

          <h3>Name:{item.name}</h3>
          <h3>Company:{item.company}</h3>
        </div>
      ))}

      {foodItemsData.data?.data.map((item, index) => (
        <div key={index}>
          <h3>Id:{item.id}</h3>

          <h3>Name:{item.name}</h3>
          <h3>category:{item.category}</h3>
        </div>
      ))}
    </>
  );
};

export default RqParallelQuery;
