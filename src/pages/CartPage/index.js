// import { useContext } from 'react';
// import { ProductItem } from '../../components/ProductItem';
// import { StoreContext } from '../../store';
// import './style.scss';

// function CartPage() {

//   const { state, dispatch } = useContext(StoreContext);
//   console.log(state.cart)

//   return (
//     <div className="cart">

//       {state.cart !== null &&
//         Object.keys(state.cart).length > 0 ?
//         Object.values(state.cart).map((product) => {
//           return <ProductItem key={product.id} />
//         })
//         :
//         <p>Your cart is empty :)</p>

//       }
//     </div>
//   )
// }

// export {
//   CartPage
// }