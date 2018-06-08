<template>
    <div class="row">

      <div class="col-md-12">
        <div class="card">
          <paper-table :show="show" type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns">
          </paper-table>
        </div>
      </div>
    </div>
</template>
<script>
  import axios from 'axios'
  import PaperTable from 'components/UIComponents/PaperTable.vue'
  const tableColumns1 = ['Staff_id', 'Firstname', 'Lastname', 'Level']
  
  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        show: false,
        table1: {
          title: 'Advisers',
          subTitle: 'All',
          columns: [...tableColumns1],
          data: []
        },
        user: {}
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
          this.table1.data = response.data.staff
          for (let i=0; i<this.table1.data.length; i++){
            this.table1.data[i].staff_id = this.table1.data[i].user
          }
          this.show = true
          
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
