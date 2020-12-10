// import { useState, useEffect } from "react";
// import { Loader } from "../shared/Loader";
import { ProductItem } from "./ProductItem";
// import * as api from "../../api/products";

import "./style.scss";

function Main() {
  // const [products, setProducts] = useState({});
  const products = {
    1: {id: Date.now(), type: "burger", image: "/img/burger.png", name: "Smash burger", price: 10.49, rate: 5.0, time: "30 min", added: false},
    2: {id: Date.now(), type: "drink", image: "/img/burger.png", name: "Soda", price: 10.49, rate: 4.9, time: "15 min", added: false},
    3: {id: Date.now(), type: "chiabata", image: "/img/burger.png", name: "Chiabata with pork", price: 10.49, rate: 4.6, time: "25 min", added: false},
  }

  // const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchProducts()
  // }, [])

  // const fetchProducts = async () => {
  //   setLoading(true);
  //   const response = await api.fetchProducts();
  //   setProducts(response);
  //   setLoading(false);
  // }

  return (
    <div className="main">
      {/* {isLoading && <Loader />} */}
      <div className="main__container">
        {/* {!isLoading &&  */}
          <ul className="product__list">
            {Object.values(products).map((product) =>
              <ProductItem
              type={product.type}
              name={product.name}
              id={product.id}
              image={product.image}
              price={product.price}
              rate={product.rate}
              time={product.time}
              key={product.id}
            />
            )}
          </ul>
        {/* } */}
      </div>


    </div>
  )
}

export {
  Main
}