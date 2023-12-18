import axios from "axios";
import React, { useEffect, useState } from "react";

const Mydata = () => {
  const [isLoading, setisLoading] = useState(true);
  const [data, setdata] = useState([]);
  const [error, seterror] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/data`)
      .then((res) => {
        setdata(res.data);
        setisLoading(false);
      })
      .catch((error) => {
        seterror(error);
        setisLoading(false);
      });
  }, []);

  return (
    <>
      <h2>This is Mydata Page</h2>

      {isLoading && <h2>Loading.............</h2>}
      {error && <h2>Error Occured {error.message}.............</h2>}

      {data.map((item, index) => (
        <div key={index}>
          <h3>Id:{item.id}</h3>

          <h3>Name:{item.name}</h3>
          <h3>Company:{item.company}</h3>
        </div>
      ))}
    </>
  );
};

export default Mydata;
