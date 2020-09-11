<template>
  <div class="container mt-4">
    <h1>Add Category</h1>
    <div class="form-group mt-2">
      <label for="">Category</label>
      <input type="text" class="form-control" v-model="type" />
    </div>
    <button type="button" class="btn btn-primary" @click="onAddCategory">
      Add Category
    </button>

    <ul class="list-group mt-3">
      <h2>Categories list</h2>
      <li
        class="list-group-item"
        v-for="(category, index) in categories"
        :key="index"
      >
        {{ category.type }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("http://localhost:3000/api/categories");
      return {
        categories: response.categories
      };
    } catch (error) {}
  },
  data() {
    return {
      type: ""
    };
  },
  methods: {
    async onAddCategory() {
      let data = {type:this.type}
      let result = await this.$axios.$post(
        "http://localhost:3000/api/categories",
        data
      );
       this.categories.push(data)
    }
  }
};
</script>
<style scoped>
.container {
  display: grid;
  place-items: center;
}
</style>
