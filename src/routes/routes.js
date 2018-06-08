import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Login from 'src/components/Dashboard/Views/Login.vue'
import Register from 'src/components/Dashboard/Views/Register.vue'
import AddProfile from 'src/components/Dashboard/Views/AddProfile.vue'
import Signature from 'src/components/Dashboard/Views/Signature.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import Courseform from 'src/components/Dashboard/Views/Student/Courseform.vue'
import Offerings from 'src/components/Dashboard/Views/Student/Offerings.vue'
import Adviser from 'src/components/Dashboard/Views/Adviser/Adviser.vue'
import Advisers from 'src/components/Dashboard/Views/HOD/Advisers.vue'
import Courses from 'src/components/Dashboard/Views/HOD/Courses.vue'
import AddCourse from 'src/components/Dashboard/Views/HOD/AddCourse.vue'
import EditCourse from 'src/components/Dashboard/Views/HOD/EditCourse.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DashboardLayout,
    meta: {requiresAuth: true},
    redirect: '/overview',
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: Overview
      },
      {
        path: 'profile',
        name: 'profile',
        component: UserProfile
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/addprofile',
    name: 'addprofile',
    component: AddProfile,
    meta: {requiresAuth: true}
  },
  {
    path: '/signature',
    name: 'signature',
    component: Signature,
    meta: {requiresAuth: true}
  },
  {
    path: '/student',
    component: DashboardLayout,
    meta: {requiresAuth: true},
    redirect: '/student/profile',
    children: [
      {
        path: 'offerings',
        name: 'offerings',
        component: Offerings
      },
      {
        path: 'courseform',
        name: 'courseform',
        component: Courseform
      }
    ]
  },
  {
    path: '/adviser',
    component: DashboardLayout,
    redirect: '/adviser/profile',
    meta: {requiresAuth: true},
    children: [
      {
        path: 'courses',
        name: 'courses',
        component: Adviser
      }
    ]
  },
  {
    path: '/hod',
    component: DashboardLayout,
    redirect: '/profile',
    meta: {requiresAuth: true},
    children: [
      {
        path: 'advisers',
        name: 'View Advisers',
        component: Advisers
      },
      {
        path: 'courses',
        name: 'View Courses',
        component: Courses
      },
      {
        path: 'course/add',
        name: 'Add New Course',
        component: AddCourse
      },
      {
        path: 'course/edit/:id',
        name: 'Edit Course',
        component: EditCourse,
        props: true
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
