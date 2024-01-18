export const wishlistReducer = (state = { wishlistItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      const doesExist = state.wishlistItems.findIndex(
        (item) => item && action.payload._id === item._id
      );
      if (doesExist >= 0) {
        return state;
      } else {
        return {
          ...state,
          wishlistItems: [...state.wishlistItems, action.payload],
        };
      }
    case 'DELETE_FROM_WISHLIST':
      const toBeDeletedIndex = state.wishlistItems.findIndex(
        (item) => item && action.payload._id === item._id
      );
      if (toBeDeletedIndex >= 0) {
        const updatedList = [
          ...state.wishlistItems.slice(0, toBeDeletedIndex),
          ...state.wishlistItems.slice(toBeDeletedIndex + 1),
        ];
        return {
          ...state,
          wishlistItems: updatedList,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
