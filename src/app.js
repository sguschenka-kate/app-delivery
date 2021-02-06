import { useEffect, useReducer, useCallback } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StoreContext } from './store';
import { productsReducer } from './store/reducer';
import { initialState } from './store/state';
import { Layout } from './components/Layout';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { AuthPage } from './pages/AutPage';
import { OrderPage } from './pages/OrderPage';
import * as types from './store/actions';
import { fetchService } from './api/fetchService';


function App() {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const fetchData = useCallback(async () => {

    const categories = await fetchService.fetchCategories();
    dispatch({
      type: types.FETCH_CATEGORIES,
      payload: categories,
    });
    dispatch({
      type: types.SET_LOADING,
      payload: false
    });
    dispatch({
      type: types.SYNC_FROM_LOCALSTORAGE
    })
  }, [dispatch]);

  useEffect(() => {
    fetchData()
  }, [dispatch, fetchData])

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <Router>
        {state.token !== null ?
          < Layout >
            <Route exact path="/" component={CategoriesPage} />
            <Route path="/categories/:id" component={ProductsPage} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/order" component={OrderPage} />
            <Route path="/auth" component={AuthPage} />
          </Layout> : <AuthPage />
        }
      </Router>
    </StoreContext.Provider >
  )
}

export {
  App
}