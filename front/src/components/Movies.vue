<template>
    <v-layout row wrap justify-space-around pt-5>
        <!-- controls | sorting | filter toggle -->
        <Controls :fetchMovies="getMovies" ></Controls>
        <!-- Filter card -->
        <FilterCard
          v-bind="{
            filters,
            filtersToggle,
            filterMovies,
            clearFilters,
            countryList,
            genreList
            }"
          ></FilterCard>
        <v-flex xl4 lg4 md6 sm8 xs11
          v-for="(film, idx) in movies"
          v-if="movies.length > 0"
          :key="idx">
          <Movie :movie="film" v-bind="{countryList, genreList, getMovies}"></Movie>
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
      country: [],
      genre: [],
      year: [1900, 2018]
    },
    filtersToggle: false,
    countryList: [
      'USA',
      'UK',
      'France',
      'Canada',
      'Australia',
      'New Zealand'
    ],
    genreList: [
      'Action',
      'Adventure',
      'Fantasy',
      'Drama',
      'Romance',
      'Family',
      'Crime',
      'Sci-Fi',
      'Horror',
      'Thriller'
    ]
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
      this.movies = this.filterBy(
        this.filterBy(this.filterBy(this.moviesDefault.slice(), 'year'), 'country'),
        'genre'
      )
    },
    /**
     * curMovies - list of movies (Array of Obj)
     * field     - string value to filter by (value from data > filters)
     */
    filterBy (curMovies, field) {
      if (field === 'year') {
        return curMovies.filter((elem) => {
          if (elem.Year < this.filters.year[1] && elem.Year > this.filters.year[0]) return true
          else return false
        })
      }

      if (this.filters[field].length === 0) return curMovies
      return curMovies.filter((elem) => {
        let fieldArr = elem[field[0].toUpperCase() + field.slice(1)].toLowerCase().split(',')
        let hasField = fieldArr.map(el => {
          return this.filters[field].join(',').toLowerCase().includes(el.trim())
        }).filter(el => el === true).length === this.filters[field].length
        if (hasField) return true
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
