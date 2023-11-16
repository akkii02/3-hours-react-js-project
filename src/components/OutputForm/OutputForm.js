import React, { useContext } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./OutputForm.module.css";
import CartContext from "../store/cart-context";

const OutputForm = (props) => {
  // Access the CartContext
  const cartContext = useContext(CartContext);

  // Handler for Buy button click
  const handleBuyClick = (size, selectedItem) => {
    // Call the parent component's buy handler (assuming it's passed as a prop)
    props.onBuyHandler(size);

    // Add the selected item to the cart using CartContext
    cartContext.addItem({
      id: selectedItem.id,
      shoeName: selectedItem.shoeName,
      description: selectedItem.description,
      price: selectedItem.price,
      sizes: selectedItem.sizes,
      quantityL: selectedItem.quantityL,
      quantityM: selectedItem.quantityM,
      quantityS: selectedItem.quantityS,
    });

    // Log the current cart context for debugging purposes
    console.log(cartContext);
  };

  return (
    <Card>
      {/* Map through the data array and render each item */}
      {props.data.map((data) => (
        <div className={classes.data} key={data.id}>
          <div>
            {/* Display shoe name, description, and price */}
            <span>{data.shoeName}</span>
            <span>{data.description}</span>
            <span>{data.price}</span>
          </div>
          <div className={classes.btn}>
            {/* Buttons for buying in different sizes (L, M, S) */}
            <Button onClick={() => handleBuyClick("L", data)} className={classes.button}>
              Buy Large ({data.quantityL})
            </Button>
            <Button onClick={() => handleBuyClick("M", data)} className={classes.button}>
              Buy Medium ({data.quantityM})
            </Button>
            <Button onClick={() => handleBuyClick("S", data)} className={classes.button}>
              Buy Small ({data.quantityS})
            </Button>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default OutputForm;
