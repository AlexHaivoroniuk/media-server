<template>
    <v-layout row wrap justify-center>
        <v-dialog
            v-model="dialog"
            persistent
            :overlay="false"
            max-width="500px"
        >
            <v-btn slot="activator" icon @click="clickHandler($event)"><v-icon color="teal">fa-edit</v-icon></v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">
                        Edit movie
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field
                                    name="title"
                                    label="Title"
                                    color="teal accent-2"
                                    v-model="editForm.title"
                                    required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea
                                    name="plot"
                                    label="Plot"
                                    color="teal accent-2"
                                    v-model="editForm.plot"
                                    required
                                    auto-grow
                                ></v-textarea>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea
                                    label="Actors"
                                    v-model="editForm.actors"
                                    color="teal accent-2"
                                    required
                                    auto-grow
                                ></v-textarea>
                            </v-flex>
                            <v-flex xs12>
                                <v-select
                                    :items="countryList"
                                    v-model="editForm.country"
                                    label="Country"
                                    multiple
                                    chips
                                    color="teal accent-2"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12>
                                <v-select
                                    :items="genreList"
                                    v-model="editForm.genre"
                                    label="Choose genre"
                                    multiple
                                    chips
                                    color="teal accent-2"
                                  ></v-select>
                            </v-flex>
                            <v-layout row wrap>
                              <v-flex class="px-3" lg8 md8>
                                <v-slider
                                  v-model="editForm.year"
                                  :min="1900"
                                  :max="2018"
                                  color="teal accent-2"
                                >
                                </v-slider>
                              </v-flex>
                              <v-flex
                                lg2
                                md2
                                shrink
                                >
                                <v-text-field
                                  v-model="editForm.year"
                                  class="mt-0"
                                  color="teal accent-2"
                                  hide-details
                                  single-line
                                  type="number"
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="green" flat @click="modal = true">Submit</v-btn>
                    <v-btn color="red" flat @click.native="dialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="modal"
            scrollable
            max-width="500px"
        >
            <v-card>
                <v-card-title class="headline">Are you sure to submit changes?</v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click="submitEditedMovie">Agree</v-btn>
                <v-btn color="red darken-1" flat @click="modal = false">Disagree</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
  props: ['countryList', 'genreList', 'movie', 'getMovies'],
  data: () => ({
    dialog: false,
    modal: false,
    editForm: {
      actors: '',
      country: '',
      genre: [],
      plot: '',
      title: '',
      year: 2018
    }
  }),
  methods: {
    clickHandler: function (e) {
      console.log(this.movie)
      console.log(this.movie._id)
      this.editForm = {
        actors: this.movie.Actors,
        country: this.movie.Country.split(',').map(el => {
          return el.trim()
        }),
        genre: this.movie.Genre.split(',').map(el => {
          return el.trim()
        }),
        plot: this.movie.Plot,
        title: this.movie.Title,
        year: this.movie.Year
      }
      console.log(this.editForm)
    },
    submitEditedMovie: function () {
      this.modal = false
      this.dialog = false
      console.log(JSON.stringify(this.editForm))
      fetch(`http://localhost:4000/movies/${this.movie._id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(this.editForm)
      })
        .then(res => { console.log('edited', res); this.getMovies() })
        .catch(err => console.log('Could not edit movie', err))
    }
  }
}
</script>
