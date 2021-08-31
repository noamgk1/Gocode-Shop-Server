import { useState, createContext } from "react";

export const CartContext = createContext();

function CartContextProvider(props) {
  const [cartList, setCartList] = useState([]);

  const onAdd = (product) => {
    let exist = cartList.findIndex((x) => x.id === product.id);
    if (exist > -1) {
      setCartList(
        cartList.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        )
      );
    } else
      setCartList([
        ...cartList,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty: 1,
        },
      ]);
  };

  const onRemove = (product) => {
    let exist = cartList.findIndex((x) => x.id === product.id);
    if (exist > -1) {
      if (cartList[exist].qty === 1) {
        setCartList(cartList.filter((x) => x.id !== product.id));
      } else {
        setCartList(
          cartList.map((x) =>
            x.id === product.id ? { ...x, qty: x.qty - 1 } : x
          )
        );
      }
    } else return;
  };
  const qtyId = (id) => {
    let exist = cartList.findIndex((x) => x.id === id);

    if (exist > -1) {
      return cartList[exist].qty;
    } else return 0;
  };
  const value = { cartList, onAdd, onRemove, qtyId };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
}

export default CartContextProvider;
