import { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { StoreContext } from './store';
import { productsReducer } from './store/reducer';
import { initialState } from './store/state';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { SYNC_FROM_LOCALSTORAGE } from './store/actions';


function App() {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  useEffect(() => {
    dispatch({
      type: SYNC_FROM_LOCALSTORAGE
    })
  }, [dispatch])

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <Router>
        <Layout>
          <Route exact path="/" component={HomePage} />
          <Route path="/cart" component={CartPage} />
        </Layout>
      </Router>
    </StoreContext.Provider >
  )
}

export {
  App
}