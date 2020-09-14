<template>
  <div class="registerPage">
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <div class="text-center">
            <nuxt-link href="/">
              <img src="/img/logo-black.png" alt="" />
            </nuxt-link>
          </div>
          <form action="" class="mt-4">
            <div class="a-box a-spacing-extra-large">
              <div class="a-box-inner">
                <h1 class="a-spacing-small">Sign In</h1>

                <!-- email  -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_email" class="a-form-label"
                    >Email</label
                  >
                  <input
                    v-model="email"
                    type="email"
                    id="ap_customer_email"
                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                  />
                </div>
                <!-- password -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_password" class="a-form-label"
                    >Password</label
                  >
                  <input
                    v-model="password"
                    type="password"
                    id="ap_customer_password"
                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                  />
                </div>

                <!-- button -->
                <div class="a-row a-spacing-extra-large mb-4">
                  <span class="a-button-primary">
                    <span class="a-button-inner">
                      <span class="a-button-text" @click="onSignIn"
                        >Continue</span
                      >
                    </span>
                  </span>
                </div>
                <hr />
                <div class="a-row">
                  <b>
                    Don't have an account?
                    <nuxt-link to="/signup" class="a-link-emphasis"
                      >Sign Up</nuxt-link
                    >
                  </b>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  auth: "guest",
  layout: "none",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async onSignIn() {
      try {
        this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });

        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
