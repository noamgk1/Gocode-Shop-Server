import { useState, createContext } from "react";

export const CartContext = createContext();

// Hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);

      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState

      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state

      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

function CartContextProvider(props) {
  const [cartList, setCartList] = useLocalStorage("Cart", []);

  const onAdd = (product) => {
    product.id = product.id ? product.id : product._id;
    let exist = cartList.findIndex((x) => x.id === product.id);
    if (exist > -1) {
      setCartList(
        cartList.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        )
      );
    } else {
      setCartList([
        ...cartList,
        {
          category: product.category,
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty: 1,
        },
      ]);
    }
  };

  const onRemove = (product) => {
    product.id = product.id ? product.id : product._id;
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

  const value = { setCartList, cartList, onAdd, onRemove, qtyId };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
}

export default CartContextProvider;
