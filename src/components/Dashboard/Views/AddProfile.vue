<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Profile Information</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-6">
            <label>Are you a staff or student</label>
            <div class="form-control row">
                <select
                       v-model="role">
                <option v-for="data in roles" :value="data">{{data}}</option>
              </select>
            </div>
          </div>
          <div class="col-md-6" v-if="role=='Staff'">
            <label>Staff Role</label>
            <div class="form-control row">
                <select
                       v-model="staff">
                <option v-for="data in staffing" :value="data">{{data}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="First Name"
                      placeholder="First Name"
                      v-model="firstname">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Last Name"
                      placeholder="Last Name"
                      v-model="lastname">
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6" v-if="staff != 'Dean'">
            <label>Department</label>
            <div class="form-control row">
            <select
                       v-model="department_code">
                <option v-for="dept in departments" :value="dept">{{dept}}</option>
            </select>
            </div>
          </div>
          <div class="col-md-6" v-else-if="staff = 'Dean'">
            <label>Faculty</label>
            <div class="form-control row">
            <select
                       v-model="faculty_code">
                <option v-for="fac in faculties" :value="fac">{{fac}}</option>
            </select>
            </div>
          </div>
          <div class="col-md-6" v-if="role == 'Student'">
            <label>Level</label>
            <div class="form-control row">
             <select
                       v-model="level">
                <option v-for="data in levels" :value="data">{{data}}</option>
            </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label>Sex</label>
            <div class="form-control row">
             <select
                       v-model="sex">
                <option v-for="data in sexs" :value="data">{{data}}</option>
            </select>
            </div>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Phone"
                      placeholder=""
                      v-model="phone">
            </fg-input>
          </div>
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="submit">
            Add Profile
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
        role: "",
        firstname: "",
        lastname: "",
        sex: "",
        phone: "",
        level: "",
        department_code: "",
        faculty_code: "",
        departments: [],
        faculties: [],
        levels: [],
        sexs: ['F', 'M'],
        roles: ['Student', 'Staff'],
        staff: '',
        hod: '',
        dean: '',
        adviser: '',
        staffing: ['HOD', 'Dean', 'Adviser'],
        valid: false,
      }
    },
    created() {
      this.getDept()
      this.getFac()
      this.getLevels()
    },
    methods: {
      submit() {
          if(this.role == 'Student'){
            axios.post('http://127.0.0.1:5000/api/student/profile', {
              'firstname' : this.firstname,
              'lastname' : this.lastname,
              'sex' : this.sex,
              'phone' : this.phone,
              'department' : this.department_code,
              'level' : this.level,
            }, 
            {withCredentials: true}, {
              headers: 
              {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
            })
            .then(response => {
              if (response.data.message == "success"){
                this.$router.push('/signature')
              }
            })
            .catch(e => {
              console.log(e)
            })
          }   
           else if(this.role == 'Staff'){
            axios.post('http://127.0.0.1:5000/api/staff/profile', {
              'firstname' : this.firstname,
              'lastname' : this.lastname,
              'sex' : this.sex,
              'phone' : this.phone,
              'faculty' : this.faculty_code,
              'department_code' : this.department_code,
              'staff' : this.staff,
            },
              {withCredentials: true}, {
              headers: 
              {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
            })
            .then(response => {
              if (response.data.message == "success"){
                this.$router.push('/signature')
              }
            })
            .catch(e => {
              console.log(e)
            })
          } 
      },
      getDept() {
        axios.get('http://127.0.0.1:5000/api/departments', 
        {withCredentials: true}, {
            headers: 
            {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
          })
        .then(response => {
          var data =response.data
          for (let i=0; i < data.length; i++){
              this.departments[i] = data[i].code
          }
        })
        .catch(e => {
          console.log(e);
        });
      },
      getFac() {
        axios.get('http://127.0.0.1:5000/api/faculties', 
        {withCredentials: true}, {
            headers: 
            {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
          })
        .then(response => {
          var data =response.data
          for (let i=0; i < data.length; i++){
              this.faculties[i] = data[i].name
          }
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
          var data =response.data
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
