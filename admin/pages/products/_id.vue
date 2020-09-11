<template>
  <div class="container">
    <h1>Update Product</h1>
    <div class="col-sm-3"></div>
    <div class="col-sm-6 mt-2">
      <!-- category -->
      <div class="form-group">
        <label for="">Category</label>
        <select class="form-control" v-model="product.category">
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
        <select class="form-control" v-model="product.owner">
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
        <input type="text" class="form-control" v-model="product.title" />
      </div>
      <!-- price -->
      <div class="form-group">
        <label for="">Price</label>
        <input type="number" class="form-control" v-model="product.price" />
      </div>
      <!-- stockQuantity -->
      <div class="form-group">
        <label for="">Stock Quantity</label>
        <input
          type="number"
          class="form-control"
          v-model="product.stockQuantity"
        />
      </div>
      <!-- description -->
      <div class="form-group">
        <label for="">Description</label>
        <textarea
          cols="30"
          rows="2"
          class="form-control"
          v-model="product.description"
        ></textarea>
      </div>
      <!-- photo upload -->
      <div class="form-group">
        <label for="">Add Photo</label>
        <p v-show="message" class="bg-danger text-center">Please select image</p>
        <div class="row">
          <div class="col-sm-6">
            <input type="file" @change="onSelected"/>
          </div>
          
          <div class="col-sm-6">
            <img :src="product.photo" style="width:50px;height:50px" />
          </div>
        </div>
      </div>
      <!-- button -->
      <button type="button" class="btn btn-primary" @click="onUpdateProduct">
        Update Product
      </button>
    </div>
    <div class="col-sm-3"></div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, params }) {
    try {
      let categories = $axios.$get("http://localhost:3000/api/categories");
      let owners = $axios.$get("http://localhost:3000/api/owners");
      let product = $axios.$get(
        "http://localhost:3000/api/products/" + params.id
      );

      const [catRes, ownRes, proRes] = await Promise.all([
        categories,
        owners,
        product
      ]);

      return {
        categories: catRes.categories,
        owners: ownRes.owners,
        product: proRes.product
      };

      this.product = proRes.product;
    } catch (error) {}
  },
  data() {
    return {
      product: {
        owner: null,
        category: null,
        title: "",
        price: "",
        description: "",
        selectedFile: null,
        stockQuantity: ""
      },
      message: false
    };
  },
  methods: {
    onSelected(event) {
      this.product.selectedFile = event.target.files[0];
    },
    async onUpdateProduct() {
      let data = new FormData();
      data.append("title", this.product.title);
      data.append("price", this.product.price);
      data.append("description", this.product.description);
      data.append("stockQuantity", this.product.stockQuantity);
      data.append("owner", this.product.owner);
      data.append("category", this.product.category);
      if(this.product.selectedFile == null){
        return this.message = true 
      }
      else{
        data.append("photo",this.product.selectedFile,this.product.selectedFile.name);
      }

      console.log(data);

      let result = await this.$axios.$put(
        `http://localhost:3000/api/products/${this.$route.params.id}`,
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
