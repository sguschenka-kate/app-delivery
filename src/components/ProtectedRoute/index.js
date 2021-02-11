import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { StoreContext } from '../../store';

function ProtectedRoute({ component: Component, ...rest }) {
  const { state } = useContext(StoreContext);

  return (
    <Route {...rest} render={
      (props) => {
        if (state.token) {
          return <Component {...props} />
        }
        else {
          return <Redirect to="/auth" />
        }
      }
    }
    />
  )
}

export {
  ProtectedRoute
}