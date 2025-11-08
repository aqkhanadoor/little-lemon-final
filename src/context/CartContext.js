import React, { createContext, useCallback, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(undefined);

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const incoming = action.payload;
      const existing = state.items.find((item) => item.id === incoming.id);

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === incoming.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + (incoming.quantity || 1), 99),
                }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            ...incoming,
            quantity: Math.min(incoming.quantity || 1, 99),
          },
        ],
      };
    }
    case "REMOVE_ITEM": {
      const id = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
      };
    }
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity < 1) {
        return state;
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.min(quantity, 99),
              }
            : item
        ),
      };
    }
    case "CLEAR_CART": {
      return initialState;
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback((item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const derived = useMemo(() => {
    const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = state.items.reduce((total, item) => total + item.quantity * item.price, 0);

    return { itemCount, subtotal };
  }, [state.items]);

  const value = useMemo(
    () => ({
      items: state.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount: derived.itemCount,
      subtotal: derived.subtotal,
    }),
    [state.items, addItem, removeItem, updateQuantity, clearCart, derived.itemCount, derived.subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
