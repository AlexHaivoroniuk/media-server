<template>
    <v-layout row wrap justify-space-around pt-5>
        <v-flex xl10 lg10 md10 sm11 xs11>
            <v-layout row wrap  justify-center align-center>
                <v-flex md2>
                    <v-btn round ripple color="teal accent-4" dark @click="getMovies">
                        <v-icon>sync</v-icon>
                        Refresh
                    </v-btn>
                </v-flex>
                <v-flex md2>
                    <v-btn-toggle  v-model="toggle_exclusive">
                        <v-btn round color="teal accent-4" dark>
                            <v-icon>fa-sort-alpha-down</v-icon>
                        </v-btn>
                        <v-btn round color="teal accent-4" dark>
                            <v-icon>fa-sort-alpha-up</v-icon>
                        </v-btn>
                    </v-btn-toggle>
                </v-flex>
                <v-flex md2>
                  <v-btn-toggle v-model="toggle_one">
                    <v-btn
                      round
                      color="teal accent-4"
                      @click="filtersToggle = !filtersToggle"
                      ><v-icon>fa-filter</v-icon></v-btn>
                  </v-btn-toggle>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xl11 lg11 md11 sm11 xs11 v-show="!!filtersToggle">
            <v-layout row wrap justify-center>
                <v-flex xl12 lg12 md12 sm12 xs12>
                    <v-card>
                      <v-layout row wrap justify-center align-center>
                        <v-flex lg5 md5 sm11 xs11>
                          <v-card-title>
                            Country:
                          </v-card-title>
                          <v-card-actions>
                            <v-select
                              :items="countryList"
                              color="teal accent-2"
                              v-model="filters.country"
                              label="Chose country ..."
                            ></v-select>
                          </v-card-actions>
                        </v-flex>
                        <v-flex lg6 md6 sm11 xs11>
                          <v-card-title >
                            Genre:
                          </v-card-title>
                          <v-card-actions>
                            <v-layout row wrap>
                              <v-flex lg10 md10 sm11 xs11>
                                  <v-select
                                    :items="genreList"
                                    v-model="filters.genre"
                                    label="Choose genre"
                                    multiple
                                    chips
                                    color="teal accent-2"
                                  ></v-select>
                              </v-flex>
                            </v-layout>
                          </v-card-actions>
                        </v-flex>
                        <v-flex lg11 md11 sm11 xs11>
                          <v-card-title>
                            Year:
                          </v-card-title>
                          <v-card-actions>
                            <v-layout row wrap>
                              <v-flex
                                lg2
                                md2
                                shrink
                                >
                                <v-text-field
                                  v-model="filters.year[0]"
                                  class="mt-0"
                                  hide-details
                                  color="teal accent-2"
                                  single-line
                                  type="number"
                                ></v-text-field>
                              </v-flex>
                              <v-flex class="px-3" lg8 md8>
                                <v-range-slider
                                  v-model="filters.year"
                                  :min="1900"
                                  :max="2018"
                                  color="teal accent-2"
                                >
                                </v-range-slider>
                              </v-flex>
                              <v-flex
                                lg2
                                md2
                                shrink
                                >
                                <v-text-field
                                  v-model="filters.year[1]"
                                  class="mt-0"
                                  color="teal accent-2"
                                  hide-details
                                  single-line
                                  type="number"
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                          </v-card-actions>
                        </v-flex>
                        <v-flex xs5 justify-end>
                            <v-spacer></v-spacer>
                            <v-card-actions>
                              <v-btn
                                round
                                color="teal accent-4"
                                @click="filterMovies"
                                >filter<v-icon class="mx-1">fa-filter</v-icon></v-btn>
                            </v-card-actions>
                        </v-flex>
                        <v-flex xs5 justify-end>
                            <v-spacer></v-spacer>
                            <v-card-actions>
                              <v-btn
                                round
                                color="teal accent-4"
                                @click="clearFilters"
                                >clear<v-icon class="mx-1">fa-trash-alt</v-icon></v-btn>
                            </v-card-actions>
                        </v-flex>
                      </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
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

export default {
  data: () => ({
    movies: [],
    moviesDefault: [],
    filters: {
      country: '',
      genre: [],
      year: [1900, 2018]
    },
    countryList: [
      'US',
      'UK',
      'France',
      'Canada',
      'Australia'
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
    ],
    toggle_exclusive: 2,
    toggle_one: null,
    filtersToggle: false
  }),
  components: {
    Movie
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
  }
}
</script>

<style>
</style>
