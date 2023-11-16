import React, { useContext } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../store/cart-context';

function HeaderCartButton(props) {
  const cartCntx = useContext(CartContext);
  let quantity = 0;

  cartCntx.items.forEach(item => {
    // Ensure item.quantity is a number
    quantity = quantity + (Number(item.quantity) || 0);
  });

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      {/* <span>{cartCntx.message}</span> */}
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
}

export default HeaderCartButton;
