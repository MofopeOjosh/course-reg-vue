<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <router-view></router-view>
    <!--This sidebar appears only for screens smaller than 992px-->
    <side-bar type="navbar" v-if="user == 'student'" :sidebar-links="$sidebar.studentLinks">
    </side-bar>
    <side-bar type="navbar" v-if="user == 'adviser'" :sidebar-links="$sidebar.adviserLinks">
    </side-bar>
    <side-bar type="navbar" v-if="user == 'hod'" :sidebar-links="$sidebar.hodLinks">
    </side-bar>
    <side-bar type="navbar" v-if="user == 'dean'" :sidebar-links="$sidebar.deanLinks">
    </side-bar>
  </div>
</template>

<script>
  export default {
    computed: {
      user () {
        return this.$store.state.user
      },
      isLoggedIn () {
        return this.$store.state.isLoggedIn
      }
    },
  }
</script>

<style lang="scss"></style>
