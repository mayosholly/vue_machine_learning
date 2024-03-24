<template>
        

<!-- ======= Sidebar ======= -->
<aside id="sidebar" class="sidebar">

<ul class="sidebar-nav" id="sidebar-nav">

  <li class="nav-item">
    <router-link class="nav-link " :to="{name: 'Dashboard'}">
      <i class="bi bi-grid"></i>
      <span>Dashboard</span>
    </router-link>
  </li><!-- End Dashboard Nav -->



  <li class="nav-item">
    <a class="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
      <i class="bi bi-gem"></i><span>ML Classification</span><i class="bi bi-chevron-down ms-auto"></i>
    </a>
    <ul id="icons-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
      <li>
        <router-link :to="{name: 'Diabetes'}">
          <i class="bi bi-circle"></i><span>Diabetes Prediction</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'Heart'}">
          <i class="bi bi-circle"></i><span>Heart Disease Prediction</span>
        </router-link>
      </li>
    
    </ul>
  </li><!-- End Icons Nav -->

  <li class="nav-item">
    <a class="nav-link collapsed" data-bs-target="#icon-nav" data-bs-toggle="collapse" href="#">
      <i class="bi bi-gem"></i><span>ML Regression</span><i class="bi bi-chevron-down ms-auto"></i>
    </a>
    <ul id="icon-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
      <li>
        <router-link :to="{name: 'Gold'}">
          <i class="bi bi-circle"></i><span>Gold Prediction</span>
        </router-link>
      </li>
    
    </ul>
  </li><!-- End Icons Nav -->

  <li class="nav-item">
    <a class="nav-link collapsed" data-bs-target="#icon-ml" data-bs-toggle="collapse" href="#">
      <i class="bi bi-gem"></i><span>ML Algorithm Comparison</span><i class="bi bi-chevron-down ms-auto"></i>
    </a>
    <ul id="icon-ml" class="nav-content collapse " data-bs-parent="#sidebar-nav">
      <li>
        <router-link :to="{name: 'GoldLn'}">
          <i class="bi bi-circle"></i><span>Prediction with LR</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'GoldEt'}">
          <i class="bi bi-circle"></i><span>Prediction with ET</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'GoldDt'}">
          <i class="bi bi-circle"></i><span>Prediction with DT</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'GoldRf'}">
          <i class="bi bi-circle"></i><span>Prediction with RF</span>
        </router-link>
      </li>
    </ul>
  </li><!-- End Icons Nav -->


  <li class="nav-item">
    <a class="nav-link collapsed" data-bs-target="#icon-orchid" data-bs-toggle="collapse" href="#">
      <i class="bi bi-gem"></i><span>ML Deep Learning</span><i class="bi bi-chevron-down ms-auto"></i>
    </a>
    <ul id="icon-orchid" class="nav-content collapse " data-bs-parent="#sidebar-nav">
      <li>
        <router-link :to="{name: 'Orchid'}">
          <i class="bi bi-circle"></i><span>Orchid Prediction</span>
        </router-link>
      </li>
    
    </ul>
  </li><!-- End Icons Nav -->


  <li class="nav-heading">Pages</li>


  <li class="nav-item">
    <router-link  v-if="!isLoggedIn" class="nav-link collapsed" :to="{name: 'Register'}">
      <i class="bi bi-card-list"></i>
      <span>Register</span>
    </router-link>
  </li><!-- End Register Page Nav -->

  <li class="nav-item">
    <router-link  v-if="!isLoggedIn" class="nav-link collapsed" :to="{name: 'Register'}">
      <i class="bi bi-box-arrow-in-right"></i>
      <span>Login</span>
    </router-link>
  </li><!-- End Login Page Nav -->

  <li class="nav-item">
    <a v-if="isLoggedIn" @click="logout"  class="nav-link collapsed" href="#">
      <i class="bi bi-box-arrow-in-left"></i>
      <span>Logout</span>
    </a>
  </li><!-- End Error 404 Page Nav -->

  
</ul>

</aside><!-- End Sidebar-->

</template>
<script>

import { mapState, mapActions } from 'vuex'
    
    
    export default {
    computed: {
    // Using Vuex helpers to map the 'isLoggedIn' state to a computed property
    ...mapState(['isLoggedIn'])
    },
    methods: {
    // Using Vuex helpers to map the 'logout' action to a method
    ...mapActions(['logout'])
    }
}
</script>

<style>

</style>