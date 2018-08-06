<template>
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
                              v-model="filters.country"
                              label="Chose country ..."
                              multiple
                              chips
                              color="teal accent-2"
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
</template>

<script>
export default {
  props: [
    'filters',
    'filtersToggle',
    'clearFilters',
    'filterMovies',
    'countryList',
    'genreList'
  ]
}
</script>
