<template>
    <v-layout row wrap justify-space-around pt-5>
        <!-- controls | sorting | filter toggle -->
        <Controls :fetchMovies="getMovies" ></Controls>
        <!-- Filter card -->
        <FilterCard
          :filters="filters"
          :filtersTgl="filtersToggle"
          :filterMovies="filterMovies"
          :clearFilters="clearFilters"
          ></FilterCard>
        <v-flex xl4 lg4 md6 sm8 xs11
          v-for="(film, idx) in movies"
          v-if="movies.length > 0"
          :key="idx">
          <Movie :movie="film"></Movie>
        </v-flex>
    </v-layout>
</template>

<script>
import Movie from './Movie'
import Controls from './Controls'
import FilterCard from './FilterCard'

export default {
  data: () => ({
    movies: [],
    moviesDefault: [],
    filters: {
      country: '',
      genre: [],
      year: [1900, 2018]
    },
    filtersToggle: false
  }),
  components: {
    Movie,
    Controls,
    FilterCard
  },
  watch: {
    toggle_exclusive: function (newVal, oldVal) {
      this.sortAZ(newVal)
    },
    'filters.genre': function (newVal, oldVal) {
      console.log(newVal)
    }
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
          this.moviesDefault = this.movies.slice()
          console.log(this)
          console.log(data[0].Actors)
          console.log(data[1].Title)
          console.log(data[3].Poster)
        })
        .catch(err => console.error(err))
      console.log(this.filters)
    },
    sortAZ: function (sortOrder) {
      if (sortOrder === null) {
        this.filterMovies()
        return
      }
      this.movies = this.movies.sort(function (a, b) {
        if (sortOrder === 0) [b, a] = [a, b]
        if (a.Title > b.Title) return -1
        if (a.Title < b.Title) return 1
        return 0
      })
    },
    filterMovies: function () {
      this.movies = this.filterByGenre(this.filterByCountry(this.filterByYear(this.moviesDefault.slice())))
    },
    filterByYear: function (curMovies) {
      return curMovies.filter((elem) => {
        if (elem.Year < this.filters.year[1] && elem.Year > this.filters.year[0]) return true
        else return false
      })
    },
    filterByCountry: function (curMovies) {
      if (this.filters.country === '') return curMovies
      return curMovies.filter((elem) => {
        if (elem.Country.toLowerCase().includes(this.filters.country.toLowerCase())) return true
        else return false
      })
    },
    filterByGenre: function (curMovies) {
      if (this.filters.genre.length === 0) return curMovies
      return curMovies.filter((elem) => {
        let genresArr = elem.Genre.toLowerCase().split(',')
        // console.log('genresArr', genresArr)
        // console.log('filters.genre', this.filters.genre.join(',').toLowerCase())
        let hasGenre = genresArr.map(el => {
          return this.filters.genre.join(',').toLowerCase().includes(el.trim())
        }).filter(el => el === true).length === this.filters.genre.length
        if (hasGenre) return true
        else return false
      })
    },
    clearFilters: function () {
      this.movies = this.moviesDefault
      this.filters = {
        country: '',
        genre: [],
        year: [1900, 2018]
      }
    }
  },
  mounted: function () {
    this.getMovies()
    this.$on('sort', function (e) {
      this.sortAZ(e)
    })
    this.$on('tglFilters', function () {
      this.filtersToggle = !this.filtersToggle
    })
  }
}
</script>

<style>
</style>
