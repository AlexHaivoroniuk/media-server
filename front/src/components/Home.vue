<template>
  <v-layout column wrap justify-center align-center my-5 py-2>
    <v-flex xs1>
      <div class="hello">
        <h1 class="title">{{ msg }}</h1>
      </div>
    </v-flex>
    <v-flex xs1>
      <v-btn color="teal" outline to="/movies">Movies</v-btn>
      <v-btn color="teal" outline to="/music">Music</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to your MediaServer'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
