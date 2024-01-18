export const addToWishlistAction=(identifier,product)=>(dispatch,getState)=>{
    let wishlistItem;
    if(identifier === "pizza"){
         wishlistItem = {
            _id:product._id,
            identifier:identifier,
            name : product.name,
            image : product.image,
            variant : 'small',
            prices : product.prices,
            price : product.prices[0]['small']
        }
    }else if(identifier === "burger"){
            wishlistItem = {
            _id:product._id,
             identifier:identifier,
             name:product.name,
             image:product.image,
             price:product.price
        }
    }
    else if(identifier === "indianMeal"){
        wishlistItem = {
            _id:product._id,
             identifier:identifier,
             name:product.name,
             image:product.image,
             price:product.price
        }
    }
    else if(identifier === "side"){
        wishlistItem = {
            _id:product._id,
             identifier:identifier,
             name:product.name,
             image:product.image,
             price:product.price
        }
    }
    else if(identifier === "bevarage"){
        wishlistItem = {
            _id:product._id,
             identifier:identifier,
             name:product.name,
             image:product.image,
             price:product.price
        }
    }
 console.log(wishlistItem);
dispatch({type:"ADD_TO_WISHLIST",payload:wishlistItem})
localStorage.setItem('wishlistItems',JSON.stringify(getState().wishlist.wishlistItems));
}
export const deleteFromWishlistAction = (wishlistItem)=>(dispatch,getState)=>{
    dispatch({type:'DELETE_FROM_WISHLIST',payload : wishlistItem})
    localStorage.setItem('wishlistItems',JSON.stringify(getState().wishlist.wishlistItems));
}