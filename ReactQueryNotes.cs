#React Query:
a powerful tool for managing server state in your React applications. It abstracts the complexities of data fetching, caching, and synchronization, allowing you to focus on building your UI.

#Why to use React Query:
Efficient Data Fetching:

Automated Caching:

Optimistic Updates:

Server State Synchronization:

Query Management:

Mutation Handling:

Error Handling:

Refetching and Polling:

In react library there is no specific pattern for data detching.
Normally we use useEffect for data fetching and useState for manage component state.
If data is needed throughout the app we thed to use state managment lib.

#To install:
npm install @tanstack/react-query@latest

//***************************************************
#Setting Up React Query
//***************************************************



//we need to wrap our application in a QueryClientProvider and provide it with a QueryClient instance.



index.js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
return (
<QueryClientProvider client={queryClient}>
<Component {...pageProps} />
</QueryClientProvider>
);
}




Rqdata.js



const Rqdata = () => {


  const fetchPersonData = () => {
    return axios.get(`http://localhost:4000/data`);
  };


const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["fetchData"],
    queryFn: fetchPersonData,})


  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
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
}




//***************************************************
#FetchQuery on button Click
//***************************************************



  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["fetchData"],
    queryFn: fetchPersonData,
  <button onClick={refetch}>Click To Fetch Data</button>
  });




//***************************************************
#Calling Function on success of fetching data or on error oeccured
//***************************************************

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
    onSuccess: handleSuccess,
    onError: handleError,
  });


  #Fetching data after regular interval
  const { data, error, isLoading, refetch } = useQuery('exampleQueryKey', fetchData, {
  refetchInterval: 5000, // Specify the time interval in milliseconds (e.g., 5000 for 5 seconds)
});



//***************************************************
#Data Transformation
//***************************************************

//We can use this when we need a particular data select according to frontend.

select

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


//***************************************************
#Custom Query Hoook
//***************************************************


hooks/useData.js

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


RqUsingCustomQueryHook.js

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




//***************************************************
#QueryById
//***************************************************
useCase:To fetch a particular details of  course or product using id.


RqProductDetails.js

const RqProductDetails = () => {
  const { id } = useParams();
  const fetchProductDetails = () => {
    return axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["fetchProductDetails", id],
    queryFn: fetchProductDetails,
      enabled:false
   
  });

 

  return (
    <>
    
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






//***************************************************
#Parallel Queries
//***************************************************


//When a single component have to fetch multiple apis.



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

 
  return (
    <>
      
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
 





//***************************************************
#Dependent Queries
//***************************************************
//Means run query one after the other when the response is received.

we need to add 
enabled:!!productsIdData

const queryResults = useQueries({
    queries: productsIdArr.map((id) => {
      return {
        queryKey: ["fetchProductsData", id],
        queryFn: () => fetchProductsData(id),
        enabled: !!productsIdData, //Dependent Query
      };
    }),
  });





//***************************************************
#Dynamic Parallel Queries
//***************************************************


means when we have to call api multiple times with a dynamic id

useCase:
Suppose on e-commerce app , first we are fetching the categories for eg. Clothing,electronics,Furniture etc, 
And using that id we are fetching the Products of it.


RqDynamicparallelQuery.js

 
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

