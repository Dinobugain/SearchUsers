<template>
  <div class="home">
      <Users></Users>
  </div>
</template>

<script>
// @ is an alias to /src
import Users from '../components/users/users.vue'
export default {
  name: 'Home',
  components: {
      Users
  }
}
</script>
