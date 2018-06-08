<template>
    <div class="container">
<div class="card">
    <div class="header">
      <h2 class="title text-center">Course Registration Form</h2>
    </div>
    <div class="content">
        <h3>Student Information </h3>
      <div class="row info">
        <div class="col-md-2 col-xs-5 text-right" >
          <p >Full Name: </p>
          <p>Matric No: </p>
          <p>Year of Study: </p>
          <p>Session Registered:</p>
          <p>Program of Study:</p>
        </div> 
        <div class="col-xs-7">
          <p>{{student.firstname}} {{student.lastname}}</p>
          <p>{{student.user}} </p>
          <p>{{student.levels}} </p>
          <p>{{courseform.session}}</p>
          <p>{{student.department}}</p>
        </div>
      </div>  
      <div class="">
        <paper-table :title="session +' '+ table.title" :show="show" :data="table.data" :columns="table.columns" signature="Signature">
        </paper-table>
      </div>
      <h3>Total Units: {{courseform.total_units}} </h3>
      <div class="row">
        <div class="col-xs-6">
            <img src="">
        </div> 
        <div class="col-xs-6 text-right">
            <img src="">
        </div>  
      </div>
        <button type="submit" class="btn btn-success btn-fill btn-wd" @click.prevent="save" onclick="window.print();return false;">
          <i class="ti-download"></i>
        </button>
      </div>  
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import PaperTable from 'components/UIComponents/PaperTable.vue'
  const tableColumns = ['CourseCode', 'Title', 'Unit']
  
  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        show: false,
        session: "",
        student: {},        
        table: {
          title: 'Sessional Registration',
          subTitle: '',
          columns: [...tableColumns],
          data: [],
        },
        courseform: {}
      }
    },
    created (){
      this.fetchOfferings()
      this.getProfile()
    },
    methods: {
    getProfile() { 
      axios.get('http://127.0.0.1:5000/api/user/role', {withCredentials: true}, {
        headers: 
        {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
      })
      .then(response => {
        var data = response.data.user
        this.student = data
        })
      .catch(e => {
        console.log(e);
      });
    },
    fetchOfferings() {
      axios.get('http://127.0.0.1:5000/api/student/courses', {withCredentials: true}, {
            headers: 
            {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
          })
      .then(response => {
        var courses = response.data.courses
        for (let i=0; i < courses.length; i++){
          this.table.data[i] = {coursecode: courses[i].department+' '+String(courses[i].code), title : courses[i].title, unit : courses[i].unit, signed : courses[i].signature }
        }
        this.courseform = response.data.courseform
        this.show = true
        })
      .catch(e => {
        console.log(e);
      });
    }
  },
  }

</script>
<style>
.info p{
  font-size: 12px;
}
</style>
