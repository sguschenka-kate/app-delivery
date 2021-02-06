import { useContext, useEffect, useState, useCallback } from 'react';
import { StoreContext } from '../../store';
import { Category } from '../../components/Category';
import { ProductItem } from '../../components/ProductItem';
import { CustomInput } from '../../components/CustomInput';
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

  const handleSearch = useCallback(async () => {
    const data = await fetchService.searchData(value);
    dispatch({
      type: types.FETCH_PRODUCTS,
      payload: data
    })
  }, [dispatch, value])

  const submitForm = (e) => {
    handleSearch();
    console.log(e);
  }

  useEffect(() => {
    if (value) {
      handleSearch()
    }
    return
  }, [handleSearch, value])

  return (
    <div className="main">

      {categoriesFetched ?
        <>
          <form onSubmit={(e) => submitForm} className="search__container">
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
                key={product.id}
                product={product}
              />
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