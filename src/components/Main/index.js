import { useState, useEffect } from "react";
import { Loader } from "../shared/Loader";
import { ProductList } from "./ProductList";
import * as api from "../../api/products";

import "./style.scss";

function Main() {
  const [products, setProducts] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true);
    const response = await api.fetchProducts();
    setProducts(response);
    setLoading(false);
  }

  return (
    <div className="main">
      {isLoading && <Loader />}
      {!isLoading && <ProductList />}

    </div>
  )
}

export {
  Main
}