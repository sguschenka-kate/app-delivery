import { useState, useEffect } from "react";
import { Loader } from "../Loader";
import { ProductItem } from "../ProductItem";
import { Categories } from "../Categories";
import { Cart } from "./Cart";
import * as api from "../../api/fetchService";

import "./style.scss";

function Main() {
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
    console.log(products)
    console.log(categories)
  }, [])

  const fetchData = async () => {
    setLoading(true);
    await fetchCategories();
    await fetchProducts();
    setLoading(false);
  }

  async function fetchProducts() {
    const response = await api.fetchProducts();
    setProducts(response);
  }

  async function fetchCategories() {
    const response = await api.fetchCategories();
    setCategories(response);
  }

  return (
    <div className="main">
      {isLoading && <Loader />}

      <div className="main__container">
        {!isLoading &&
          <div>
            <Categories categories={categories}></Categories>

            <ul className="product__list">
              {Object.values(products).map((product) =>
                <ProductItem
                  product={product}
                  key={product.id}
                />
              )}
            </ul>
          </div>
        }
      </div>


    </div>
  )
}

export {
  Main
}









import { useState, useContext, useEffect } from 'react';
import { StoreContext } from '../store';

// import { Loader } from '../components/Loader';
import { Categories } from '../components/Categories';

function HomePage() {
  const { state, dispatch } = useContext(StoreContext);
  // const [isLoading, setLoading] = useState(true);



  return (
    <div className="main">
      {/* {isLoading && <Loader />} */}

      <div className="main__container">
        {isLoading && state.state.products !== null && <>
          {state.state.products.length > 0 ?
            <div>
              <Categories />
              <ul className="product__list">
                {Object.values(state.state.products).map((product) =>
                  <ProductItem
                    product={product}
                    key={product.id}
                  />
                )}
              </ul>
            </div> :
            <p>Sorry, there are no products to order today</p>}
        </>}
      </div>


    </div>
  )
}

export {
  HomePage
}