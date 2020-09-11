<template>
  <div class="container">
    <h1>Add a New Product</h1>
    <div class="col-sm-3"></div>
    <div class="col-sm-6 mt-2">
      <!-- category -->
      <div class="form-group">
        <label for="">Category</label>
        <select class="form-control" v-model="category">
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category._id"
            >{{ category.type }}</option
          >
        </select>
      </div>
      <!-- owner -->
      <div class="form-group">
        <label for="">Owner</label>
        <select class="form-control" v-model="owner">
          
          <option
            v-for="(owner, index) in owners"
            :key="index"
            :value="owner._id"
            >{{ owner.name }}</option
          >
        </select>
      </div>
      <!-- title  -->
      <div class="form-group">
        <label for="">Title</label>
        <input type="text" class="form-control" v-model="title" />
      </div>
      <!-- price -->
      <div class="form-group">
        <label for="">Price</label>
        <input type="number" class="form-control" v-model="price" />
      </div>
      <!-- stockQuantity -->
      <div class="form-group">
        <label for="">Stock Quantity</label>
        <input type="number" class="form-control" v-model="stockQuantity" />
      </div>
      <!-- description -->
      <div class="form-group">
        <label for="">Description</label>
        <textarea
          cols="30"
          rows="2"
          class="form-control"
          placeholder="Write something here"
          v-model="description"
        ></textarea>
      </div>
      <!-- photo upload -->
      <div class="form-group">
        <label for="">Add Photo</label>
        <div class="a-row">
          <input type="file" @change="onSelected" />
        </div>
      </div>
      <!-- button -->
      <button type="button" class="btn btn-primary" @click="onAddProduct">
        Add Product
      </button>
    </div>
    <div class="col-sm-3"></div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    try {
      let categories = $axios.$get("http://localhost:3000/api/categories");
      let owners = $axios.$get("http://localhost:3000/api/owners");

      const [catRes, ownRes] = await Promise.all([categories, owners]);

      return {
        categories: catRes.categories,
        owners: ownRes.owners
      };
    } catch (error) {}
  },
  data() {
    return {
      owner: null,
      category: null,
      title: "",
      price: 0,
      description: "",
      selectedFile: null,
      stockQuantity: 1
    };
  },
  methods: {
   onSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    async onAddProduct() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("price", this.price);
      data.append("description", this.description);
      data.append("stockQuantity", this.stockQuantity);
      data.append("owner", this.owner);
      data.append("category", this.category);
      data.append("photo", this.selectedFile, this.selectedFile.name);

      let result = await this.$axios.$post(
        "http://localhost:3000/api/products",
        data
      );

      this.$router.push("/");
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
