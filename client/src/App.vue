<template>
  <div id="nav">
      <NavBar></NavBar>
  </div>
  <router-view/>
</template>

<script>
    import NavBar from "./components/supplements/navBar.vue"
    import 'materialize-css/dist/css/materialize.css'
    import 'material-design-icons/iconfont/material-icons.css'
    export default {
        name: 'App',
        components: {
            NavBar
        },
    }
</script>
