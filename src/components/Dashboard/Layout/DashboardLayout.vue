<template>
  <div class="wrapper">
    <side-bar type="sidebar" v-if="user == 'student'" :sidebar-links="$sidebar.studentLinks">
    </side-bar>
    <side-bar type="sidebar" v-if="user == 'adviser'" :sidebar-links="$sidebar.adviserLinks">
    </side-bar>
    <side-bar type="sidebar" v-if="user == 'hod'" :sidebar-links="$sidebar.hodLinks">
    </side-bar>
    <side-bar type="sidebar" v-if="user == 'dean'" :sidebar-links="$sidebar.deanLinks">
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      isLoggedIn () {
        return this.$store.state.isLoggedIn
      }
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
