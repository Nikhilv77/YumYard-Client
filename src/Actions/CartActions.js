export const addToCartAction=(identifier,product,variant,quantity)=>(dispatch,getState)=>{
    console.log(identifier,product,variant,quantity);
    const numberQuantity = +quantity
    let cartItem;
    if(identifier === "pizza"){
         cartItem = {
            _id:product._id,
            identifier:identifier,
            name : product.name,
            image : product.image,
            variant : variant,
            quantity : numberQuantity,
            prices : product.prices,
            price : product.prices[0][variant]
        }
    }else if(identifier === "burger"){
            cartItem = {
            _id:product._id,
             identifier:identifier,
             name:product.name,
             image:product.image,
             quantity:numberQuantity,
             price:product.price
        }
    }
    else if(identifier === "indianMeal"){
        cartItem = {
            _id:product._id,
             identifier:identifier,
             name:product.name,
             image:product.image,
             quantity:numberQuantity,
             price:product.price
        }
    }
    else if(identifier === "side"){
        cartItem = {
            _id:product._id,
             identifier:identifier,
             name:product.name,
             image:product.image,
             quantity:numberQuantity,
             price:product.price
        }
    }
    else if(identifier === "bevarage"){
        cartItem = {
            _id:product._id,
             identifier:identifier,
             name:product.name,
             image:product.image,
             quantity:numberQuantity,
             price:product.price
        }
    }

dispatch({type:"ADD_TO_CART",payload:cartItem})
localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}
export const deleteFromCartAction = (pizza)=>(dispatch,getState)=>{
    dispatch({type:'DELETE_FROM_CART',payload : pizza})
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}