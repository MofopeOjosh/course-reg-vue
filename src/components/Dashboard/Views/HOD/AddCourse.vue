<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Course Info</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Code"
                      placeholder="e.g 101, 201, 301..."
                      v-model="course.code">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Title"
                      placeholder="e.g Introduction to ..."
                      v-model="course.title">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <label>Units</label>
            <div class="form-control row">
             <select
                       v-model="course.unit">
                <option v-for="data in units" :value="data">{{data}}</option>
            </select>
            </div>
          </div>
          <div class="col-md-6">
            <label>Level</label>
            <div class="form-control row">
             <select
                       v-model="course.level">
                <option v-for="data in levels" :value="data">{{data}}</option>
            </select>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <label>Adviser</label>
            <div class="form-control row">
             <select
                       v-model="course.adviser">
                <option v-for="data in advisers" :value="data.user">{{data.firstname}} {{data.lastname}}</option>
            </select>
            </div>
          </div>
        </div>


        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="addCourse">
            Add Course
          </button>
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
        user: {},
        units: [1, 2, 3, 4, 5, 6],
        course: {
          code: "",
          title: "",
          unit: Number,
          level: Number,
          adviser: Number
        },
        levels: [],
        advisers: [],
      }
    },
    created (){
      this.getProfile()
      this.getLevels()
    },
    methods: {
      getProfile (){
        axios.get('http://127.0.0.1:5000/api/user/role', {withCredentials: true}, {
          headers: 
          {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
        })
        .then(response => {
          var data = response.data.user
          this.user = data
          this.fetchAdvisers()
          })
        .catch(e => {
          console.log(e);
        });
      },
      fetchAdvisers() {
        const vm = this
        var dept = this.user.department
        axios.get('http://127.0.0.1:5000/api/dept/'+dept+'/staff', {withCredentials: true}, {
              headers: 
              {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
            })
        .then(response => {
          this.advisers = response.data.staff
          console.log(response.data.staff)
        })
        .catch(e => {
          console.log(e);
        });
      },
      addCourse () {        
        var dept = this.user.department
        axios.post('http://127.0.0.1:5000/api/dept/'+dept+'/course/add', this.course, 
              {withCredentials: true}, 
              {headers: 
              {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
            })
        .then(response => {
          this.$router.push("/hod/courses")
        })
        .catch(e => {
          console.log(e);
        });
      },
      getLevels() {
        axios.get('http://127.0.0.1:5000/api/levels', 
        {withCredentials: true}, {
            headers: 
            {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
          })
        .then(response => {
          var data = response.data
          for (let i=0; i < data.length; i++){
              this.levels[i] = data[i].id
          }
        })
        .catch(e => {
          console.log(e);
        });
      }
    }
  }

</script>
<style>
.form-control{
  margin-bottom: 25px;
}
.form-control select{
  width: 104%; 
  height:40px;
}
</style>
