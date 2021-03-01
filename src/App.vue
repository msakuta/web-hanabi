<template>
  <div class="appContainer">
    <h1>Web-hanabi</h1>
    <web-hanabi/>
    <hr>
    Powered by <a href="https://v3.vuejs.org/">Vue.js</a><br>
    Source on <a href="https://github.com/msakuta/web-hanabi">GitHub</a>.
  </div>
</template>

<script lang="ts">
import WebHanabi from './components/WebHanabi.vue'

export default {
  name: 'App',
  components: {
    WebHanabi
  }
}
</script>

<style>
body {
  background-color: #001f1f;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #abccec;
  margin-top: 30px;
  margin-bottom: 30px;
}

.appContainer {
  width: 650px;
  position: relative;
  margin: auto;
}
</style>
