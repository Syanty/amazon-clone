<template>
  <main>
    <div class="a-spacing-large"></div>

    <div class="container-fluid browsing-history">
      <div class="row">
        <div class="col-sm-8 col-8">
          <h1 class="a-size-large a-spacing-none a-text-normal">
            All Products
          </h1>

          <div class="a-spacing-large"></div>
          <!-- Button -->
          <nuxt-link to="/products" class="a-button-buy-again"
            >Add new Product</nuxt-link
          >
          <nuxt-link to="/categories" class="a-button-history margin-right-10"
            >Add new category</nuxt-link
          >
          <nuxt-link to="/owners" class="a-button-history margin-right-10"
            >Add new Owner</nuxt-link
          >
        </div>
      </div>
    </div>
    <div class="a-spacing-large"></div>
    <div class="container-fluid browsing-history">
      <div class="row">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 br bb"
        >
          <div class="history-box">
            <!-- product image -->
            <nuxt-link :to="`${product.photo}`" class="a-link-normal">
              <img :src="product.photo" class="img-fluid" />
            </nuxt-link>
            <!-- product title -->
            <div class="a-spacing-top-base asin-title">
              <span class="a-text-normal">
                <div class="p13n-sc-truncated">{{ product.title }}</div>
              </span>
            </div>
            <!-- product rating -->
            <div class="a-row">
              <nuxt-link to="">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </nuxt-link>
              <span class="a-letter-space"></span>
              <span class="a-color-tertiary a-size-small asin-reviews"
                >(1111)</span
              >
            </div>
            <!-- product price -->
            <div class="a-row">
              <span class="a-size-base a-color-price">
                <span class="p13n-sc-price">${{ product.price }}</span>
              </span>
            </div>
            <!-- product buttons -->
            <div class="a-row">
              <nuxt-link
                :to="`/products/${product._id}`"
                class="a-button-history margin-right-10"
                >Update</nuxt-link
              >
              <a
                @click="deleteProduct(product._id)"
                class="a-button-history margin-right-10"
                >Delete</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("http://localhost:3000/api/products");

      return {
        products: response.products
      };
    } catch (error) {}
  },
  methods: {
    async deleteProduct(id, index) {
      try {
        let response = await this.$axios.$delete(
          `http://localhost:3000/api/products/${id}`
        );
        if (response.status) {
          this.products.splice(index);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
.container {
  display: grid;
  place-items: center;
}
</style>
