import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./components/Home";
import Mydata from "./components/Mydata";
import Rqdata from "./components/Rqdata";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RqdataTransformation from "./components/RqdataTransformation";
import Products from "./components/Product/Products";
import RqProductDetails from "./components/Product/RqProductDetails";
import RqParallelQuery from "./components/RqParallelQuery";
import RqDynamicParallelQuery from "./components/RqDynamicParallelQuery";
import RqPaginated from "./components/RqPaginated";
import RqInfiniteQuery from "./components/RqInfiniteQuery";

function App() {
  const queryClient = new QueryClient(); // Use QueryClient directly, not as a constructor

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <h2>Welcome</h2>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/mydata">My Data</Link>
                </li>
                <li>
                  <Link to="/rqdata">Rq Data</Link>
                </li>
                <li>
                  <Link to="/rqdatatransform">Rq Data Transformation</Link>
                </li>

                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/parallelquery">Parallel Query</Link>
                </li>

                <li>
                  <Link to="/dynamicquery">Dynamic Query</Link>
                </li>

                <li>
                  <Link to="/paginatedquery">Paginated Query</Link>
                </li>

                <li>
                  <Link to="/infinitequeries">Infinite Queries</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/mydata" element={<Mydata />} />
              <Route path="/rqdata" element={<Rqdata />} />
              <Route
                path="/rqdatatransform"
                element={<RqdataTransformation />}
              />

              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<RqProductDetails />} />

              <Route path="/parallelquery" element={<RqParallelQuery />} />

              <Route
                path="/dynamicquery"
                element={<RqDynamicParallelQuery />}
              />

              <Route path="/paginatedquery" element={<RqPaginated />} />

              <Route path="/infinitequeries" element={<RqInfiniteQuery />} />
            </Routes>
          </div>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
