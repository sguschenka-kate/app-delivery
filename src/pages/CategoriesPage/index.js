import { useContext, useEffect, useState, useCallback } from 'react';
import { StoreContext } from '../../store';
import { Category } from '../../components/Category';
import { ProductItem } from '../../components/ProductItem';
import { CustomInput } from '../../components/CustomInput';
import { ButtonSecondary } from '../../components/ButtonSecondary';
import { ButtonPrimary } from '../../components/ButtonPrimary';

import './style.scss';
import { Link } from 'react-router-dom';
import * as types from '../../store/actions';
import { fetchService } from '../../api/fetchService';
import { useDebouncedFunction } from '../../lib/useDebounceFn';

function CategoriesPage({ history }) {

  const { state, dispatch } = useContext(StoreContext);
  const [value, setValue] = useState('');
  const d = useDebouncedFunction(v => setValue(v), 300)

  const categoriesFetched = state.categories !== null && Object.keys(state.categories).length > 0;

  const handleClick = (product) => {
    dispatch({
      type: types.ADD_TO_CART,
      payload: {
        product
      }
    })
  }

  const handleSearch = useCallback(async () => {
    const data = await fetchService.searchData(value);
    dispatch({
      type: types.FETCH_PRODUCTS,
      payload: data
    })
  }, [dispatch, value])

  const submitForm = (e) => {
    handleSearch();
    e.preventDefault();
  }

  useEffect(() => {
    if (value) {
      handleSearch()
    }
    return
  }, [handleSearch, value])

  const moveToProductPage = path => history.push(path)
  return (
    <div className="main">

      {categoriesFetched ?
        <>
          <form onSubmit={(e) => submitForm(e)} className="search__container">
            <CustomInput
              onChange={(e) => d(e.target.value)}
              type="search"
              placeholder="What do you wish to order?"
              className="search__input"
              aria-label="Search for products"
            />
          </form>

          {value

            ?

            Object.values(state.products).map(product =>
              <ProductItem
                product={product}
                key={product.id}
                handleRoute={moveToProductPage}
              >
                {state.cart[product.id] ?
                  <Link to="/cart" className="products__btn">
                    <ButtonSecondary className="products__btn--go-to-cart">
                      go to cart
                  </ButtonSecondary>
                  </Link> :
                  <ButtonPrimary onClick={() => handleClick(product)} className="products__btn">
                    buy
                </ButtonPrimary>
                }

              </ProductItem>
            )

            :
            <div className="categoires">
              <ul className="categories__list">
                {Object.values(state.categories).map(category =>
                  <Link
                    to={`/categories/${category.id}`}
                    key={category.id}
                  >
                    <Category
                      category={category}
                    >
                    </Category>
                  </Link>
                )}
              </ul>
              <Link to='/products' className="categories__all-products">
                All products
              </Link>
            </div>}
        </> :
        <p>Something went wrong...🥺 please, try again </p>
      }


    </div >
  )
}

export {
  CategoriesPage
}