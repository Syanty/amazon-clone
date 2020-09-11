<template>
  <div class="container">
    <h1>Add a New Product</h1>
    <div class="col-sm-3"></div>
    <div class="col-sm-6 mt-2">
      <!-- category -->
      <div class="form-group">
        <label for="">Category</label>
        <select class="form-control">
          <option v-for="(category, index) in categories" :key="index" :value="category._id">{{
            category.type
          }}</option>
        </select>
      </div>
      <!-- owner -->
      <div class="form-group">
        <label for="">Owner</label>
        <select class="form-control">
          <option v-for="(owner,index) in owners" :key="index" :value="owner._id">{{owner.name}}</option>
        </select>
      </div>
      <!-- title  -->
      <div class="form-group">
        <label for="">Title</label>
        <input type="text" class="form-control" />
      </div>
      <!-- price -->
      <div class="form-group">
        <label for="">Price</label>
        <input type="number" class="form-control" />
      </div>
      <!-- description -->
      <div class="form-group">
        <label for="">Description</label>
        <textarea
          cols="30"
          rows="5"
          class="form-control"
          placeholder="Write something here"
        ></textarea>
      </div>
      <!-- photo upload -->
      <div class="form-group">
        <label for="">Add Photo</label>
        <div class="a-row">
          <label for="" class="choosefile-button">
            <i class="fal fa-plus"></i>
            <input type="file" />
          </label>
        </div>

        <p style="margin-top=-70px">Name of photo</p>
      </div>
      <!-- button -->
      <button type="button" class="btn btn-primary">Add Product</button>
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
  }
};
</script>
<style scoped>
.container {
  display: grid;
  place-items: center;
}
</style>
