import React from "react";
import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const LIMIT = 10;

const RqInfiniteQuery = () => {
  const handleSuccess = () => {
    console.log("performing side effects on success", data);
    // Additional side effects on success if needed
  };

  const handleError = (error) => {
    console.error("Error occurred:", error);
    console.log("performing side effects after occurring an error");
    // Additional side effects on error if needed
  };

  const fetchPersonData = ({ pageParam = 10 }) => {
    console.log(pageParam, "pageParampageParampageParampageParam");
    return axios.get(
      `https://dummyjson.com/comments?skip=${pageParam - LIMIT}&limit=${10}`
    );
  };

  const {
    isLoading,
    data,
    isError,
    error,
    isFetching,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["fetchData"],
    queryFn: fetchPersonData,
    onSuccess: handleSuccess,
    onError: handleError,
    getNextPageParam: (lastPage, pages) => {
      console.log(lastPage, "sadfasdfasdfasf", pages);

      const prevEleLength = (pages.length || 1) * 10;

      // const totalLenght = lastPage.data.total;

      return prevEleLength + LIMIT;
    },
  });
  console.log(
    "🚀 ~ file: RqInfiniteQuery.js:32 ~ RqInfiniteQuery ~ data:",
    data
  );

  if (isError) {
    return <h2>Error Occurred: {error.message}</h2>;
  }

  return (
    <>
      {"React Query Data "}

      <button onClick={refetch}>Click To Fetch Data</button>
      {isLoading && <h2>Loading.............</h2>}

      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group?.data?.comments.map((item, index) => (
            <div key={index}>
              <h3>Id:{item.id}</h3>
              <h3>Body:{item.body}</h3>
            </div>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

export default RqInfiniteQuery;
