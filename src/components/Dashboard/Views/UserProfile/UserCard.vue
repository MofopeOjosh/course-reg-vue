<template>
  <div class="card card-user">
    
    <div class="content text-center">
      <img :src="'static/uploads/'+user.user+'.png'" alt="..." class="img-responsive">
        <h4 class="title">{{user.firstname}} {{user.lastname}}
          <br>
          <a href="#">
            <small></small>{{user.user}}</small>
          </a>
          <div v-if="role == 'student'">
            <p>{{user.department}}</p>
            <p>{{user.levels}}00 Level</p>
          </div>
          <div v-if="role == 'adviser'">
            <p>{{user.department}}</p>
            <p>{{user.level}}00 Level Adviser</p>
          </div>
          <div v-if="role == 'hod'">
            <p>{{user.department}}</p>
            <p>Head of Department</p>
          </div>
          <div v-if="role == 'dean'">
            <p>{{user.faculty}}</p>
            <p>Faculty Dean</p>
          </div>
        </h4>
      </div>
     
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        user: {}
      }
    },
    created (){
      this.getProfile()
    },
    computed: {
      role() {
        return this.$store.state.user
      }
    },
    methods: {
      getClasses (index) {
        var remainder = index % 3
        if (remainder === 0) {
          return 'col-md-3 col-md-offset-1'
        } else if (remainder === 2) {
          return 'col-md-4'
        } else {
          return 'col-md-3'
        }
      },
      getProfile (){
        axios.get('http://127.0.0.1:5000/api/user/role', {withCredentials: true}, {
          headers: 
          {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
        })
        .then(response => {
          var data = response.data.user
          this.user = data
          })
        .catch(e => {
          console.log(e);
        });
      }
    }
  }

</script>
<style>
  
</style>
