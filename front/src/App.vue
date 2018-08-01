<template>
  <v-app dark>
    <v-navigation-drawer
         app
         clipped
         v-model="drawer"
         temporary>
      <v-list>
        <v-list-tile
            v-for="tile in drawerTiles"
            :key="tile.text">
          <v-list-tile-action>
            <v-icon color="teal">{{tile.icon}}</v-icon>
          </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{tile.text}}
              </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left color="teal darken-2">
      <v-toolbar-side-icon @click="drawer = !drawer">
        <v-icon>view_headline</v-icon>
      </v-toolbar-side-icon>
      <!-- <v-btn round ripple color="primary" dark @click="getMovies">Refresh</v-btn> -->
      <v-spacer></v-spacer>
      <v-toolbar-title>
        Media Server
      </v-toolbar-title>
    </v-toolbar>
    <v-container fluid grid-list-xl>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Movies from './components/Movies'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Movies
  },
  data () {
    return {
      drawer: false,
      drawerTiles: [
        { icon: 'home', text: 'Home' },
        { icon: 'local_movies', text: 'Movies' },
        { icon: 'library_music', text: 'Music' }
      ]
    }
  }
}
</script>

<style>

</style>
