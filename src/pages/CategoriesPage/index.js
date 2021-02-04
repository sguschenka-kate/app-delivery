import { useContext, useRef, useState } from 'react';
import { StoreContext } from '../../store';
import { Category } from '../../components/Category';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import './style.scss';
import { Link } from 'react-router-dom';
// import * as types from '../../store/actions';
// import { fetchService } from '../../api/fetchService';

function CategoriesPage({ history }) {

  const { state } = useContext(StoreContext);
  const input = useRef(null)
  const [value, setValue] = useState('');

  const handleSearch = async (value) => {

    // const data = await fetchService.searchData()
    // dispatch({
    //   type: types.SEARCH_INPUT,
    //   payload: value
    // })
  }

  return (
    <div className="main">

      {state.categories !== null &&
        Object.keys(state.categories).length > 0 ?
        <>

          <div className="search__container">
            <input
              ref={input}
              value={value}
              onInput={(e) => setValue(e.target.value)}
              type="search"
              placeholder="What do you wish to order?"
              className="search__input"
              aria-label="Search for products"
            />
            <ButtonPrimary
              className="search__button"
              onClick={() => handleSearch(value)}
            >Search</ButtonPrimary>
          </div>

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
          </ul>
        </> :
        <p>Something went wrong...🥺 please, try again </p>
      }


    </div >
  )
}

export {
  CategoriesPage
}