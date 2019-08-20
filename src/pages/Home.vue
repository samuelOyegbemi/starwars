<template>
  <main-layout :q="q">
    <div v-if="loading.starships || (starships && starships.length > 0)">
      <headings title="Popular Starships"></headings>
      <loading class="p-5" :value="loading.starships"></loading>
      <div v-if="!loading.starships">
        <div class="col-12 d-flex flex-wrap p-4">
          <starship
            v-for="(s, index) in (starships || []).slice(
              0,
              glanceLimits.starships
            )"
            v-bind="{ s, i: index }"
          ></starship>
        </div>
        <div
          class="d-flex justify-content-center align-content-center p-3"
          v-if="starships && starships.length > glanceLimits.starships"
        >
          <router-link :to="q ? `/starships?search=${q}` : '/starships'"
            ><button class="btn btn-outline-dark view-more">
              VIEW MORE
            </button></router-link
          >
        </div>
      </div>
    </div>
    <div v-if="loading.planets || (planets && planets.length > 0)">
      <headings title="Popular Planets"></headings>
      <loading class="p-5" :value="loading.planets"></loading>
      <div v-if="!loading.planets">
        <div class="col-12 d-flex flex-wrap p-4">
          <planet
            v-for="(p, index) in (planets || []).slice(0, glanceLimits.planets)"
            v-bind="{ p, i: index }"
          ></planet>
        </div>
        <div class="d-flex align-content-center justify-content-center">
          <span class="dot rounded-circle"></span>
          <span class="dot rounded-circle center"></span>
          <span class="dot rounded-circle"></span>
        </div>
      </div>
    </div>
    <div v-if="loading.people || (people && people.length > 0)">
      <headings title="Popular Characters"></headings>
      <loading class="p-5" :value="loading.people"></loading>
      <div v-if="!loading.people">
        <div class="col-12 d-flex flex-wrap p-4">
          <people
            v-for="(p, index) in (people || []).slice(0, glanceLimits.people)"
            v-bind="{ p, i: index }"
          ></people>
        </div>
        <div
          class="d-flex justify-content-center align-content-center p-3 pb-5"
          v-if="people && people.length > glanceLimits.people"
        >
          <router-link :to="q ? `/characters?search=${q}` : '/characters'"
            ><button class="btn btn-outline-dark view-more">VIEW MORE</button>
          </router-link>
        </div>
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
import Planet from "../components/Planet";
import People from "../components/People";
import Loading from "../components/Loading";

export default {
  components: {
    People,
    MainLayout,
    Headings,
    Starship,
    Planet,
    Loading
  },
  data() {
    return {
      people: null,
      planets: null,
      q: null,
      starships: null,
      loading: { starships: true, people: true, planets: true },
      glanceLimits: { starships: 6, people: 4, planets: 3 },
      errored: false
    };
  },
  methods: {
    loadData: function() {
      this.loading = { starships: true, people: true, planets: true };
      this.q = this.$route.query.search;
      const s = this.q ? `?search=${this.q}` : "";
      this.people = null;
      this.starships = null;
      this.planets = null;
      http.get(apiConfig.people + s).then(response => {
        this.people = response.data.results;
        this.loading.people = false;
      });
      http.get(apiConfig.planets + s).then(response => {
        this.planets = response.data.results;
        this.loading.planets = false;
      });
      http.get(apiConfig.starships + s).then(response => {
        this.starships = response.data.results;
        this.loading.starships = false;
      });
    }
  },
  watch: {
    "$route.query.search"() {
      try {
        this.loadData();
        if (!this.$route.query.search) {
          this.$router.replace({ query: {} });
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped lang="scss">
.view-more {
  min-width: 400px !important;
}
.dot {
  width: 16px;
  height: 16px;
  margin: 4px;
  border: 1px solid #00000066;
  &.center {
    background-color: #00000066;
  }
}
</style>
