<template>
    <v-layout row wrap justify-space-around>
        <v-flex xl4 lg4 md6 sm11 xs11
          v-for="(film, idx) in movies"
          v-if="movies.length > 0"
          :key="idx">
          <Movie :movie="film"></Movie>
        </v-flex>
    </v-layout>
</template>

<script>
import Movie from './Movie'

export default {
  data: () => ({
    movies: []
  }),
  components: {
    Movie
  },
  methods: {
    getMovies: function () {
      fetch('http://localhost:4000/movies', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          this.movies = data.filter((movie) => {
            if (movie.Title !== undefined) return true
          })
          console.log(this)
          console.log(data[0].Actors)
          console.log(data[1].Title)
          console.log(data[3].Poster)
        })
        .catch(err => console.error(err))
    }
  },
  mounted: function () {
    this.getMovies()
  }
}
</script>
