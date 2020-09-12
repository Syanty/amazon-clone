<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-6">
        <h1>Profile Page</h1>
        <div class="form-group">
          <label for="">Name</label>
          <input type="text" class="form-control" v-model="name" :placeholder="$auth.$state.user.name" />
        </div>
        <div class="form-group">
          <label for="">Email</label>
          <input type="email" class="form-control" v-model="email" :placeholder="$auth.$state.user.email" />
        </div>
        <div class="form-group">
          <label for="">Password</label>
          <input type="password" class="form-control" v-model="password" />
        </div>
        <button type="button" class="btn btn-warning" @click="onUpdateProfile">
          Update Profile
        </button>
      </div>
      <div class="col-lg-3"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async onUpdateProfile(){
      let data = {
        name: this.name,
        email: this.email,
        password:this.password
      }
      try {
        let response = await this.$axios.$put("/api/auth/user", data)

        if(response.success){
          this.name = "",
          this.email = "",
          this.password = ""
        }

        await this.$auth.fetchUser()
      } catch (error) {
        
      }
    }
  },
};
</script>
<style scoped></style>
