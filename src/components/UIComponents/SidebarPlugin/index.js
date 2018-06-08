import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  studentLinks: [
    {
      name: 'Dashboard',
      icon: 'ti-panel',
      path: '/overview'
    },
    {
      name: 'User Profile',
      icon: 'ti-user',
      path: '/profile'
    },
    {
      name: 'Courses',
      icon: 'ti-view-list-alt',
      path: '/student/offerings'
    },
    {
      name: 'Courseform',
      icon: 'ti-file',
      path: '/student/courseform'
    }
  ],
  adviserLinks: [
    {
      name: 'Dashboard',
      icon: 'ti-panel',
      path: '/overview'
    },
    {
      name: 'User Profile',
      icon: 'ti-user',
      path: '/profile'
    },
    {
      name: 'Courses',
      icon: 'ti-view-list-alt',
      path: '/adviser/courses'
    }
  ],
  hodLinks: [
    {
      name: 'Dashboard',
      icon: 'ti-panel',
      path: '/overview'
    },
    {
      name: 'User Profile',
      icon: 'ti-user',
      path: '/profile'
    },
    {
      name: 'Advisers',
      icon: 'ti-anchor',
      path: '/hod/advisers'
    },
    {
      name: 'Courses',
      icon: 'ti-view-list-alt',
      path: '/hod/courses'
    },
    {
      name: 'Add Course',
      icon: 'ti-plus',
      path: '/hod/course/add'
    }
  ],
  deanLinks: [
    {
      name: 'Dashboard',
      icon: 'ti-panel',
      path: '/overview'
    },
    {
      name: 'User Profile',
      icon: 'ti-user',
      path: '/profile'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
