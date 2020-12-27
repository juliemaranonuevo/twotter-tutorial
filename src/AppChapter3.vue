<template>
  <div id="app">
    @{{ user.username }} - {{ fullName }}
    <strong>Followers: </strong> {{ followers }}
    <button @click="followUser">
      Follow
    </button>
  </div>
</template>

<script>
import UserProfile from "./components/UserProfile"
export default {
  name: 'App',
  data() {
    return {
      followers: 0,
      user: {
        id: 1,
        username: '_MitchellRomney',
        firstName: 'Mitchell',
        lastName: 'Romney',
        email: 'mitchellromney@theearthissquare.com',
        isAdmin: true
      }
    }
  },
  watch: {
    followers(newFollowerCount, oldFollowerCount) {
      if (oldFollowerCount < newFollowerCount) {
        console.log(`${this.user.username} has gained a follower!`);
      }
    }
  },
  computed: {
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    }
  },
  methods: {
    followUser() {
      this.followers++
    }
  },
  mounted() {
    this.followUser();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  text-align: center;
}
</style>
