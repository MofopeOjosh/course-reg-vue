<template>
  <div class="card">
    <div class="header">
      <h4 class="title text-center">Register</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-4 col-md-offset-4">
            <fg-input type="text"
                      label="Staff/Student No"
                      v-model="id">
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-md-offset-4">

            <fg-input type="email"
                      label="Email"
                      v-model="email">
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-md-offset-4">
            <fg-input type="password"
                      label="Password"
                      v-model="password">
            </fg-input>
          </div>
        </div>

        
        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="register">
            Register
          </button>
        </div>
        <div class="text-center">
          <h4>Have an account? <a href="/#/login"> Login</a></h4>
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
        id: '',
        email: '',
        password: ''
      }
    },
    methods: {
      register () {
            axios.post('http://127.0.0.1:5000/api/auth/register', {
            'id': this.id,
            'email': this.email,
            'password': this.password
          }, 
          {withCredentials: true}, {
            headers: 
            {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
          })
          .then(response => {
            if(response.data.message = "success"){
              localStorage.setItem('auth_token', response.data.token)
              this.$router.push('/addprofile')
            }
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  }

</script>
<style>

</style>
