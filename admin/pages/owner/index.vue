<template>
  <div class="container mt-5">
    <h1>Add Owner</h1>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label for="">Name</label>
          <input type="text" class="form-control" v-model="name" />
        </div>
        <div class="form-group">
          <label for="">About</label>
          <input type="text" class="form-control" v-model="about" />
        </div>
        <div class="form-group">
          <label for="">Photo</label>
          <div class="a-row">
            <input type="file" @change="onSelected" />
          </div>
        </div>
        <!-- button -->
        <button type="button" class="btn btn-primary" @click="onAddOwner">
          Add Owner
        </button>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>About</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(owner, index) in owners" :key="index">
              <td>{{owner.name}}</td>
              <td>{{owner.about}}</td>
              <td><a :href="owner.photo"><img :src="owner.photo" style="width:50px;height:50px"></a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("http://localhost:3000/api/owners");
      return {
        owners: response.owners
      };
    } catch (error) {}
  },
  data() {
    return {
      name: "",
      about: "",
      selectedFile: null
    };
  },
  methods: {
    onSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    async onAddOwner() {
      let data = new FormData();
      data.append("name", this.name);
      data.append("about", this.about);
      data.append("photo", this.selectedFile, this.selectedFile.name);
      let result = await this.$axios.$post(
        "http://localhost:3000/api/owners",
        data
      );
      this.owners.push(data);
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
