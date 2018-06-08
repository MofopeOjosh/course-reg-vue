<template>
    <div class="row">
    <div class="col-md-5">
        <input type="text"
        class="form-control"
                  placeholder="Search for a course"
                  v-model="message" 
                  v-on:keyup="Search($event)"
                  >
        </input>
      </div>
       <div class="col-md-12">
        <div class="card" v-if="results.length > 1">
          <paper-table title="Search Results" :sub-title="table1.subTitle" :data="results" :columns="table1.columns" :action="add" @add="addOffering">
          </paper-table>
        </div>
      </div>
      <div class="col-md-12">
        <div class="card" v-if="results.length < 1">
          <paper-table :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :action="add" @add="addOffering">
          </paper-table>
        </div>
      </div>
      <div class="col-md-12">
        <div class="card">
          <paper-table type="hover" :show="show" :title="table2.title" :sub-title="table2.subTitle" :data="table2.data" :columns="table2.columns" :action="remove" @remove="deleteCourses">
          </paper-table>
        </div>
      </div>
    </div>
</template>
<script>
  import axios from 'axios'
  import PaperTable from 'components/UIComponents/PaperTable.vue'
  const tableColumns1 = ['CourseCode', 'Title', 'Unit']
  const tableColumns2 = ['CourseCode', 'Title', 'Unit']
  
  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        show: false,
        table1: {
          title: 'Courses',
          subTitle: 'All',
          columns: [...tableColumns1],
          data: []
        },
        table2: {
          title: this.selected,
          subTitle: '',
          columns: [...tableColumns2],
          data: []
        },
        results: [],
        message: '',
        remove: {
          name: 'Remove',
          class: 'btn-danger',
          icon: 'ti-trash',
          method: 'remove',
        },
        add: {
          name: 'Add',
          class: 'btn-primary',
          icon: 'ti-plus',
          method: 'add',
        }
      }
    },
    created() {
      this.fetchOfferings()
      this.fetchCourses()
    },
    methods: {
      fetchOfferings() {
        axios.get('http://127.0.0.1:5000/api/student/courses', {withCredentials: true}, {
              headers: 
              {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
            })
        .then(response => {
          var courses = response.data.courses
          this.table2.data = []
          for (let i=0; i < courses.length; i++){
            this.table2.data[i] = {coursecode: courses[i].department+' '+String(courses[i].code), title : courses[i].title, unit : courses[i].unit, idd : courses[i].id }
          }
          this.show == true
        })
        .catch(e => {
          console.log(e);
        })
      },
      fetchCourses() {
        axios.get('http://127.0.0.1:5000/api/course', {withCredentials: true}, {
              headers: 
              {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
            })
        .then(response => {
          var data = response.data
          this.table1.data = []
          for (let i=0; i < data.length; i++){
            this.table1.data[i] = {coursecode: data[i].department+' '+String(data[i].code), title : data[i].title, unit : data[i].unit, idd : data[i].id }
          }
          this.show=true
        })
        .catch(e => {
          console.log(e);
        });
      },
      Search($event){
        this.results = []
          var string = this.message
          
          string = string.toLowerCase()
          var length = string.length
          var lastChar = string.charAt(length - 1)
          if (lastChar === ' ') {
            this.results = []
          }
          if (string.includes(' ') && lastChar !== ' ') {
            var arraystring = string.split(' ')
            var arraystringlength = arraystring.length
            string = arraystring[arraystringlength - 1]
          }
          for (var index in this.table1.data) {
            var word = this.table1.data[index].coursecode
            word = word.toLowerCase()
            
            if (word.includes(string) && string !== '') {
              
              this.results.push(this.table1.data[index])
            }
          }
      },
      addOffering(id) {
        axios.post('http://127.0.0.1:5000/api/student/courses/add', {"course_id" : id}, 
              {withCredentials: true}, 
              {headers: 
              {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
            })
        .then(response => {
          this.fetchOfferings()
        })
        .catch(e => {
          console.log(e);
        });
      },
      deleteCourses(id) {
        
        axios.delete('http://127.0.0.1:5000/api/student/courses/delete/'+id,
              {withCredentials: true}, 
              {headers: 
              {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
            })
        .then(response => {
          this.fetchOfferings()
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
