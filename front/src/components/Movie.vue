<template>
    <v-card
        class="ma-5"
        >
        <v-card-media
            :src="this.movie.Poster"
            height="300px"
        >
        </v-card-media>
        <v-card-title class="title">
        {{this.movie.Title}} ({{this.movie.Year}})
        </v-card-title>
        <v-card-text>
        <span class="font-weight-medium">Cast:</span> <span class="font-weight-light font-italic">{{this.movie.Actors}}</span>
        </v-card-text>
        <v-card-text>
        <span class="font-weight-medium">Country: </span> {{this.movie.Country}}
        </v-card-text>
        <v-card-text>
        <span class="font-weight-medium">Genre:</span> {{this.movie.Genre}}
        </v-card-text>
        <v-divider></v-divider>
            <v-card-text class="body-1">
                {{this.movie.Plot}}
            </v-card-text>
        <v-divider></v-divider>
        <v-card-text v-for="(rate, idx) in this.movie.Ratings" :key="idx">
            {{rate.Source}} : {{rate.Value}}
        </v-card-text>
        <v-card-actions>
        <v-btn icon>
            <v-icon color="teal">favorite</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon color="teal">bookmark</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon color="teal">share</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn outline color="teal lighten-2" dark>WATCH</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  props: ['movie']
}
</script>
