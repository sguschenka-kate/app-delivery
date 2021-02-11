import { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';

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


function App() {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const handleLoading = () => {
    dispatch({
      type: types.SET_LOADING,
      payload: false
    })
  }

  useEffect(() => {
    handleLoading()
  }, [])


  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          <Route exact path="/auth" component={AuthPage} />
          <Layout>
            {/* <Switch> */}
            <ProtectedRoute exact path="/" component={CategoriesPage} />
            <ProtectedRoute path="/categories/:id" component={ProductsPage} />
            <ProtectedRoute path="/products" component={ProductsPage} />
            <ProtectedRoute path="/product/:id" component={ProductPage} />
            <ProtectedRoute path="/cart" component={CartPage} />
            <ProtectedRoute path="/order" component={OrderPage} />
            {/* </Switch> */}
          </Layout>
        </Switch>
      </Router>
    </StoreContext.Provider >
  )
}

export {
  App
}