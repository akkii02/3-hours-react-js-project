import React, { useContext, useState } from 'react';
import InputForm from './components/InputForm/InputForm';
import Header from './components/Header/Header';
import OutputForm from './components/OutputForm/OutputForm';
import Cart from './components/Cart/Cart';
import CartProvider from './components/store/CartProvider';
import CartContext from './components/store/cart-context';

function App() {
  const cartCntx = useContext(CartContext);
  const [data, setData] = useState([]);
  const [cartIsShow, setCartIsShow] = useState(false);

  const showCartHandler = () => {
    setCartIsShow(true);
  };

  const hideCartHandler = () => {
    setCartIsShow(false);
  };

  const getDataHandler = (shoeName, description, price, sizes, quantityL, quantityM, quantityS) => {
    setData((prevData) => [
      ...prevData,
      {
        id: shoeName + '_' + Date.now(),
        shoeName,
        description,
        price,
        sizes,
        quantityL,
        quantityM,
        quantityS,
      },
    ]);
  };

  const handleBuy = (size) => {
    // Find the item in data array based on size
    const selectedItem = data.find((item) => item.sizes[`size${size}`]);
    
    // Update the quantity in the state
    setData((prevData) => {
      const updatedData = prevData.map((item) => {
        if (item.id === selectedItem.id) {
          return {
            ...item,
            [`quantity${size}`]: item[`quantity${size}`] - 1,
          };
        }
        return item;
      });
      cartCntx.addItem({
        id: selectedItem.id,
        shoeName: selectedItem.shoeName,
        description: selectedItem.description,
        price: selectedItem.price,
        sizes: selectedItem.sizes,
        quantityL: selectedItem.quantityL,
        quantityM: selectedItem.quantityM,
        quantityS: selectedItem.quantityS,
      });
      return updatedData;
    });

  };

  return (
    <CartProvider>
      {cartIsShow && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <InputForm getDataHandler={getDataHandler} />
      <OutputForm data={data} onBuyHandler={handleBuy} />
    </CartProvider>
  );
}

export default App;
