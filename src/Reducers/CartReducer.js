export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const doesExist = state.cartItems.findIndex(
        (item) =>
          action.payload._id === item._id &&
          action.payload.variant === item.variant
      );
      if (doesExist >= 0) {
        const updatedCartItems = state.cartItems.map((item, index) => {
          if (index === doesExist) {
            item.quantity =
              parseInt(item.quantity, 10) +
              parseInt(action.payload.quantity, 10);
          }
          return item;
        });
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
      case 'DELETE_FROM_CART':
          const toBeDeleted = state.cartItems.findIndex(item=>item._id===action.payload._id && item.variant === action.payload.variant)
          const toBeRemoved = state.cartItems[toBeDeleted];
          const updatedCart = state.cartItems.filter(item=>item._id !== toBeRemoved._id || item.variant !== toBeRemoved.variant)  
      return{
        ...state,
        cartItems:updatedCart
      }
    default:
      return state;
  }
};
