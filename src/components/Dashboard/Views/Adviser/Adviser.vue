<template>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <paper-table :show="show" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns">
          </paper-table>
        </div>
      </div>

      <div class="col-md-12">
        <div class="card" v-for="data in courses" v-if="data.students.length > 0">
          <paper-table  type="hover" :show="show" :title="data.coursecode" :sub-title="data.title" :data="data.students" :columns="table1.columns2" :action="sign" @sign="addSignature">
          </paper-table>
        </div>
      </div>
    </div>
</template>
<script>
  import axios from 'axios'
  import PaperTable from 'components/UIComponents/PaperTable.vue'
  const tableColumns1 = ['CourseCode', 'Title', 'Unit', 'View']
  const tableColumns2 = ['Matric', 'Name', 'Department', 'Level']
  
  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        show: false,
        table1: {
          title: 'Courses',
          subTitle: 'Assigned Courses',
          columns: [...tableColumns1],
          columns2: [...tableColumns2],
          data: []
        },
        courses: [],
        selected: "",
        students: [],
        sign: {
          name: 'Sign',
          class: 'btn-warning',
          icon: 'ti-pencil',
          method: 'sign',
        }
      }
    },
    created (){
      this.fetchAdvisories()
    },
    methods: {
    fetchAdvisories() {
      const vm = this
      axios.get('http://127.0.0.1:5000/api/staff/courses', {withCredentials: true}, {
            headers: 
            {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
          })
      .then(response => {
        vm.table1.data = []
        var data = response.data
        for (let i=0; i < data.length; i++){
          vm.table1.data[i] = {coursecode: data[i].department+' '+String(data[i].code), title : data[i].title, id : data[i].id, unit : data[i].unit, students: []};
          vm.courses[i] = vm.table1.data[i]
        }
        vm.fetchStudents()
        
      })
      .catch(e => {
        console.log(e);
      });
    },
    fetchStudents() {
       const vm = this
      
      for (let i=0; i < this.table1.data.length; i++){
        var course_id = this.table1.data[i].id
        axios.get('http://127.0.0.1:5000/api/course/'+course_id+'/students', {withCredentials: true}, {
              headers: 
              {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
            })
        .then(response => {
          var data = response.data
          var students = []
          for (let j=0; j < data.length; j++){
            students[j] = {idd: data[j].user, name: data[j].firstname+' '+data[j].lastname, matric : data[j].user, level : data[j].levels, department : data[j].department, course : this.table1.data[i].id }
          }
          this.table1.data[i].students =  students
          this.show = false
          this.show = true
          
        })
        .catch(e => {
          console.log(e);
        });
        
      }
    },
    addSignature(id, course) {
        axios.post('http://127.0.0.1:5000/api/staff/courses/sign', {"student_id" : id, "course_id": course},
        {withCredentials: true}, 
        {headers: 
        {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
      })
      .then(response => {
        this.fetchAdvisories()
      })
      .catch(e => {
        console.log(e);
      });

        
    }
  },
  }

</script>
<style>

</style>
