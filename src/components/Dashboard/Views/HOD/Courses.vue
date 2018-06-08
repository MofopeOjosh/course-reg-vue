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
        <div class="card" v-if="message !='' && results.length < 1">
          <h4> No Course found.</h4> 
        </div>
      </div>
      <div class="col-md-12">
        <div class="card" v-if="results.length > 1">
          <div class="card">
            <paper-table type="hover" title="Search Results" :sub-title="table1.subTitle" :data="results" :columns="table1.columns" :action="edit" @edit="editAction">
            </paper-table>
          </div>
        </div>
      </div>
      <div class="col-md-12" v-if="results.length < 1">
        <div class="card">
          <paper-table type="hover" :show="show" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :action="edit" @edit="editAction">
          </paper-table>
        </div>
      </div>

    </div>
</template>
<script>
  import axios from 'axios'
  import PaperTable from 'components/UIComponents/PaperTable.vue'
  const tableColumns1 = ['CourseCode', 'Title', 'Unit']
  
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
        user: {},
        edit: {
          name: 'Edit',
          class: 'btn-warning',
          icon: 'ti-pencil',
          method: 'edit',
        },
        message: "",
        results: []
      }
    },
    created() {
      this.getProfile()
    },
    computed: {
      role() {
        return this.$store.state.user
      }
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
          this.fetchCourses()
          })
        .catch(e => {
          console.log(e);
        });
      },
      fetchCourses() {
        const vm = this
        var dept = this.user.department
        axios.get('http://127.0.0.1:5000/api/dept/'+dept+'/courses', {withCredentials: true}, {
              headers: 
              {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
            })
        .then(response => {
          vm.table1.data = []
          var data = response.data
          for (let i=0; i < data.length; i++){
            vm.table1.data[i] = {coursecode: data[i].department+' '+String(data[i].code), title : data[i].title, idd : data[i].id, unit : data[i].unit, students: []};
          }
          this.show = true
        })
        .catch(e => {
          console.log(e);
        });
      },
      editAction(course_id){
        this.$router.push('/hod/course/edit/'+course_id)
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
    }
  }

</script>
<style>

</style>
