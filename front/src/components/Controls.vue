<template>
        <v-flex xl10 lg10 md10 sm11 xs11>
            <v-layout row wrap  justify-center align-center>
                <v-flex md2>
                    <v-btn round ripple color="teal accent-4" dark @click="fetchMovies">
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
                      @click="toggle"
                      ><v-icon>fa-filter</v-icon></v-btn>
                  </v-btn-toggle>
                </v-flex>
            </v-layout>
        </v-flex>
</template>

<script>
export default {
  props: ['fetchMovies', 'tglFilters'],
  data: () => ({
    toggle_exclusive: 2,
    toggle_one: null
  }),
  watch: {
    toggle_exclusive: function (newVal, oldVal) {
      this.$parent.$emit('sort', newVal)
    }
  },
  methods: {
    toggle: function () {
      this.$parent.$emit('tglFilters')
    }
  }
}
</script>
