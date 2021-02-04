import { useContext, useRef, useState, useCallback } from 'react';
import { StoreContext } from '../../store';
import { Category } from '../../components/Category';
import { ProductItem } from '../../components/ProductItem';
import './style.scss';
import { Link } from 'react-router-dom';
import * as types from '../../store/actions';
import { fetchService } from '../../api/fetchService';

function CategoriesPage({ history }) {

  const { state, dispatch } = useContext(StoreContext);
  const input = useRef(null)
  const [value, setValue] = useState('');

  const categoriesFetched = state.categories !== null && Object.keys(state.categories).length > 0;

  const handleSearch = async (value) => {
    const data = await fetchService.searchData(value);
    console.log(data)
    dispatch({
      type: types.FETCH_PRODUCTS,
      payload: data
    })
  }

  return (
    <div className="main">

      {categoriesFetched ?
        <>
          <div className="search__container">
            <input
              ref={input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onInput={() => handleSearch(value)}
              type="search"
              placeholder="What do you wish to order?"
              className="search__input"
              aria-label="Search for products"
            />
          </div>

          {value ?
            Object.values(state.products).map(product =>
              <ProductItem
                key={product.id}
                product={product}
              />
            ) :
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
              <Link to='/products'>
                all products
            </Link>
            </ul>}
        </> :
        <p>Something went wrong...🥺 please, try again </p>
      }


    </div >
  )
}

export {
  CategoriesPage
}