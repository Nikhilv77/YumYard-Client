import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Cookies from "js-cookie";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getAllPizzasReducer,
  addNewProductReducer,
  deleteProductReducer,
  getProductByIdReducer,
  editProductReducer,
} from "../Reducers/PizzaReducer";
import { cartReducer } from "../Reducers/CartReducer";
import { wishlistReducer } from "../Reducers/WishlistReducer";
import {
  userRegReducer,
  getAllUsersReducer,
  removeUserReducer,
  updatePasswordReducer,
  getUserReducer,
} from "../Reducers/userRegReducer";
import { loginReducer } from "../Reducers/LoginReducer";
import {
  orderReducer,
  getUserOrderReducer,
  getAllOrdersReducer,
  deliveryReducer,
  deleteOrderReducer,
  sessionOrderReducer,
  downloadReceiptReducer
} from "../Reducers/OrderReducer";
import { forgotPasswordReducer } from "../Reducers/ForgotPasswordReducer";
import { userAlreadyExistsReducer } from "../Reducers/userRegReducer";
import {
  getAllBurgersReducer,
  deleteburgerReducer,
  getBurgerByIdReducer,
  addNewBurgerReducer,
  editBurgerReducer,
} from "../Reducers/BurgerReducer";
import {
  getAllIndianMealsReducer,
  deleteIndianMealReducer,
  editIndianMealReducer,
  addNewIndianReducer,
  getIndianMealByIdReducer,
} from "../Reducers/IndianMealsReducer";
import {
  getAllSidesReducer,
  deleteSidesReducer,
  addNewSideReducer,
  editSideReducer,
  getSideByIdReducer,
} from "../Reducers/SidesReducer";
import {
  getAllBevaragesReducer,
  deleteBevarageReducer,
  addNewBevarageReducer,
  editBevarageReducer,
  getBevarageByIdReducer,
} from "../Reducers/BevarageReducer";
import {
  getAllContactsReducer,
  submitContactReducer,
} from "../Reducers/ContactReducer";
import {
  getAllFeedbacksReducer,
  submitFeedbackReducer,
} from "../Reducers/FeedbackReducer";
import {
  donationReducer,
  getAllDonationsReducer,
  sessionDonationReducer,
} from "../Reducers/DonationReducer";
const rootReducer = combineReducers({
  pizzas: getAllPizzasReducer,
  burgers: getAllBurgersReducer,
  IndianMeals: getAllIndianMealsReducer,
  deleteIndianMeal: deleteIndianMealReducer,
  editIndianMeal: editIndianMealReducer,
  newIndianMeal: addNewIndianReducer,
  getIndianMealById: getIndianMealByIdReducer,
  deleteBurger: deleteburgerReducer,
  editBurger: editBurgerReducer,
  newBurger: addNewBurgerReducer,
  getBurgerById: getBurgerByIdReducer,
  deleteSide: deleteSidesReducer,
  editSide: editSideReducer,
  newSide: addNewSideReducer,
  getSideById: getSideByIdReducer,
  deleteBevarage: deleteBevarageReducer,
  Sides: getAllSidesReducer,
  Bevarages: getAllBevaragesReducer,
  getBevarageById:getBevarageByIdReducer,
  editBevarage:editBevarageReducer,
  newBevarage:addNewBevarageReducer,
  newProduct: addNewProductReducer,
  deleteProduct: deleteProductReducer,
  getProductById: getProductByIdReducer,
  editProduct: editProductReducer,
  cart: cartReducer,
  wishlist:wishlistReducer,
  user: userRegReducer,
  users: getAllUsersReducer,
  getUserByEmail : getUserReducer,
  removeUser: removeUserReducer,
  updatePassword:updatePasswordReducer,
  userAlreadyExists: userAlreadyExistsReducer,
  login: loginReducer,
  order: orderReducer,
  orders: getUserOrderReducer,
  sessionOrder:sessionOrderReducer,
  Contacts: getAllContactsReducer,
  submitContact: submitContactReducer,
  Feedbacks: getAllFeedbacksReducer,
  submitFeedback: submitFeedbackReducer,
  Donate: donationReducer,
  allDonations: getAllDonationsReducer,
 saveDonation :sessionDonationReducer,
  allOrders: getAllOrdersReducer,
  delivery: deliveryReducer,
  deleteOrder: deleteOrderReducer,
  forgotPassword: forgotPasswordReducer,
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
  const wishlistItems = localStorage.getItem("wishlistItems")
  ? JSON.parse(localStorage.getItem("wishlistItems"))
  : [];
const currUser = Cookies.get("currUser")
  ? JSON.parse(Cookies.get("currUser"))
  : null;
const initialState = {
  cart: {
    cartItems: cartItems,
  },
  login: {
    currUser: currUser,
  },
  wishlist:{
    wishlistItems:wishlistItems
  }
};

const composeEnhancers = composeWithDevTools({});
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
