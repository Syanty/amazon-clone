export const state = {
  cart: [],
  cartLength: 0
};
export const getters = {
  getCartLength(state) {
    return state.cartLength;
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
  }
};
export const actions = {
  addProductToCart({ state, commit }, product) {
    const cartProduct = state.cart.find(prod => prod.id === product._id);
    if (!cartProduct) {
      commit("pushProductToCart", product);
    } else {
      commit("incrementProductQty", product);
    }
    commit("incrementCartLength");
  }
};
export const modules = {};
