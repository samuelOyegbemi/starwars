<template>
  <main-layout>
    <div>
      <headings title="Popular Starships"></headings>
      <div class="col-12 d-flex flex-wrap p-4">
        <starship v-for="(s, index) in starships" v-bind="{ s , i : index}"></starship>
      </div>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from "../layouts/Main.vue";
import * as http from "axios";
import { apiConfig } from "../api-conf";
import Headings from "../components/Headings";
import Starship from "../components/Starship";

export default {
  components: {
    MainLayout,
    Headings,
    Starship
  },
  data() {
    return {
      people: null,
      planets: null,
      starships: null,
      loading: true,
      errored: false
    };
  },
  mounted() {
    http.get(apiConfig.people).then(response => {
      this.people = response.data.results;
    });
    http.get(apiConfig.planets).then(response => {
      this.planets = response.data.results;
    });
    http.get(apiConfig.starships).then(response => {
      this.starships = response.data.results.slice(0, 6);
      console.log(response.data.results);
    });
  }
};
</script>
