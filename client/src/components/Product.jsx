import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Product() {
  const location = useLocation();
  const { id } = location.state;
  useEffect(() => {
    axios
      .get(`http://localhost:3001/items/${id}`)
      .then((res) => res.data && console.log(res.data));
  }, []);
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}

export default Product;
