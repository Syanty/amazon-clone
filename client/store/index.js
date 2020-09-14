export const state = {
  cart: [],
  cartLength: 0
};
export const getters = {
  getCartLength(state) {
    return state.cartLength;
  },
  getCartItems(state) {
    return state.cart;
  },
  getCartTotalPrice(state){
    let total =0
    state.cart.map(product=>{
      total+= product.price * product.quantity
    })
    return total
  }
};
export const mutations = {
  pushProductToCart(state, product) {
    product.quantity = 1;
    state.cart.push(product);
  },
  incrementProductQty(state, product) {
    product.quantity++;
    let indexOfproduct = state.cart.indexOf(product);
    state.cart.splice(indexOfproduct, 1, product);
  },
  incrementCartLength(state) {
    state.cartLength = 0;
    if (state.cart.length > 0) {
      state.cart.map(product => {
        state.cartLength += product.quantity;
      });
    }
  },
  /* 
    1. Find product in the cart
    2. Change the quantity of the product
    3. Update the length of cart
    4. REplace old product with updated product
  */
  changeQty(state,{product,qty}){
    let cartProduct = state.cart.find(prod=> prod._id === product._id)
    cartProduct.quantity = qty

    state.cartLength = 0;
    if (state.cart.length > 0) {
      state.cart.map(product => {
        state.cartLength += product.quantity;
      });
    }

    let indexOfproduct = state.cart.indexOf(cartProduct)
    state.cart.splice(indexOfproduct, 1, cartProduct);

  },
  /* 
    1. Remove the product quantity from cartLenth
    2. Get the index of product that we want to delete
    3. Remove that product by using splice
  */
  removeProduct(state,product){
    state.cartLength -= product.quantity
    let indexOfproduct = state.cart.indexOf(product)
    state.cart.splice(indexOfproduct,1)  
  }
};
export const actions = {
  addProductToCart({ state, commit }, product) {
    const cartProduct = state.cart.find(prod => prod.id === product._id);
    if (!cartProduct) {
      commit("pushProductToCart", product);
    } else {
      commit("incrementProductQty", cartProduct);
    }
    commit("incrementCartLength");
  }
};
export const modules = {};
