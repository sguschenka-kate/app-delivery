import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../store';
import { Loader } from '../../components/Loader';

import './style.scss';


function Layout({ children }) {
  const { state } = useContext(StoreContext);


  return (
    <div className="layout">
      <header className="header header__container">
        <figure className="avatar">
          <img src="/img/avatar.svg" alt="Avatar" aria-hidden="true" className="avatar__img" />
        </figure>
        <Link to="/">
          <img src="/img/logo.svg" alt="logo" className="logo" />
        </Link>
        <Link className="layout__cart" to="/cart">
          <img src="/img/cart.svg" alt="Cart" aria-hidden="true" className="layout__cart-img" />

          {state.cart && <div className="layout__cart-counter">{Object.keys(state.cart).length}</div>}
        </Link>
      </header>
      <div className="container">
        {state.isLoading && <Loader />}
        {!state.isLoading && children}
      </div>
    </div >
  )
}

export {
  Layout
}