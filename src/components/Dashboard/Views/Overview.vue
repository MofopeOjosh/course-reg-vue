<template>
  <div>
    <!--Stats cards-->
    <div class="row" v-if="user=='hod'">
      <div class="col-lg-3 col-sm-6" v-for="stats in hodStats">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>
     <div class="row" v-if="user=='dean'">
      <div class="col-lg-3 col-sm-6" v-for="stats in deanStats">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>
     <div class="row" v-if="user=='adviser'">
      <div class="col-lg-3 col-sm-6" v-for="stats in adviserStats">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>
     <div class="row" v-if="user=='student'">
      <div class="col-lg-3 col-sm-6" v-for="stats in studentStats">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>
    <div class="row" v-if="user=='student'">
      <courseform></courseform>
    </div>
  </div>
  
</template>
<script>
  import StatsCard from 'components/UIComponents/Cards/StatsCard.vue'
  import Courseform from './Student/Courseform.vue'
  import axios from 'axios'

  export default {
    components: {
      StatsCard,
      Courseform
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data () {
      return {
        courseform: {},      
        units: 0,  
        studentStats: [
          {
            type: 'info',
            icon: 'ti-file',
            title: 'Courses',
            value: 0,
            footerText: 'Yesterday',
            footerIcon: 'ti-calendar'
          },
          {
            type: 'danger',
            icon: 'ti-write',
            title: 'Signed',
            value: 3,
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          },
          {
            type: 'warning',
            icon: 'ti-pulse',
            title: 'Units',
            value: 0,
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          },
        ],
        adviserStats: [
          {
            type: 'info',
            icon: 'ti-file',
            title: 'Courses',
            value: 0,
            footerText: 'Yesterday',
            footerIcon: 'ti-calendar'
          },
          {
            type: 'danger',
            icon: 'ti-write',
            title: 'Signed',
            value: 0,
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          },
          {
            type: 'warning',
            icon: 'ti-pulse',
            title: 'Submissions',
            value: 0,
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          },
        ],
        hodStats: [
          {
            type: 'info',
            icon: 'ti-file',
            title: 'Courses',
            value: 0,
            footerText: 'Yesterday',
            footerIcon: 'ti-calendar'
          },
          {
            type: 'danger',
            icon: 'ti-anchor',
            title: 'Advisers',
            value: 0,
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          },
          {
            type: 'warning',
            icon: 'ti-user',
            title: 'Students',
            value: 0,
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          },
        ],
        deanStats: [
          {
            type: 'info',
            icon: 'ti-file',
            title: 'Courses',
            value: 0,
            footerText: 'Yesterday',
            footerIcon: 'ti-calendar'
          },
          {
            type: 'danger',
            icon: 'ti-anchor',
            title: 'Advisers',
            value: 0,
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          },
          {
            type: 'warning',
            icon: 'ti-user',
            title: 'Students',
            value: 0,
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          },
        ]

      }
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      isLoggedIn () {
        return this.$store.state.isLoggedIn
      }
    },
    created() {
      this.getDashboard()
    },
    methods: {
      getDashboard(){
        if (this.user=="student"){
          this.fetchOfferings()
        }
        else if(this.user=="hod" || this.user=="adviser" || this.user=="dean"){
          axios.get('http://127.0.0.1:5000/api/user/dashboard', {withCredentials: true}, {
              headers: 
              {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
            })
          .then(response => {
            var a = response.data.a
            var b = response.data.b
            var c = response.data.c
            if(this.user=="hod"){
              this.hodStats[0].value = a
              this.hodStats[1].value = b
              this.hodStats[2].value = c
            }
            else if(this.user=="adviser"){
              this.adviserStats[0].value = a
              this.adviserStats[1].value = b
              this.adviserStats[2].value = c
            }
            else if(this.user=="dean"){
              this.deanStats[0].value = a
              this.deanStats[1].value = b
              this.deanStats[2].value = c
            }
          })
          .catch(e => {
            console.log(e)
          })
        }
        else if(!this.isLoggedIn){
          this.$router.push('/login')
        }
      },
      fetchOfferings() {
        axios.get('http://127.0.0.1:5000/api/student/courses', {withCredentials: true}, {
              headers: 
              {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000','Accept': 'application/json', 'Content-Type': 'application/json'}
            })
        .then(response => {
          var courses = response.data.courses
          var no = 0
          for (let i=0; i < courses.length; i++){
            no = no + 1
          }
          this.courseform = response.data.courseform
          this.studentStats[2].value = 10
          this.studentStats[0].value = no
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
