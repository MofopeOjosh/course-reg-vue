<template>
  <div class="card">
    <div class="header">
      <h4 class="title text-center">Login</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-4 col-md-offset-4">
            <fg-input type="text"
                      label="Student/Staff No"
                      v-model="user.id">
            </fg-input>
          </div>
        </div>
        <div class="row">
          
          <div class="col-md-4 col-md-offset-4">

            <fg-input type="password"
                      label="Password"
                      v-model="user.password">
            </fg-input>
          </div>
        </div>

       
        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="login">
            Login
          </button>
        </div>
        <div class="text-center">
          <h4>Not registered? <a href="/#/register"> Register</a></h4>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
  export default {
    data () {
      return {
        user: {
          id: "",
          password: ""
        }
      }
    },
    methods: {
      login() {
          this.$store.dispatch('login', this.user)
          .then((value) => {
            if (value!=false){
              var route = this.$store.state.user
              this.$router.push('/') 
            }           
          })
      }
    }
  }

</script>
<style>

</style>
