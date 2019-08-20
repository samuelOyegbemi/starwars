<template>
  <detail :i="id" type="starship" count="4" :value="s">
    <loading :value="loading" class="p-5"></loading>
    <div class="col-12 d-flex justify-content-center" v-if="!loading && !error">
      <div v-if="s" class="col-10 col-md-8 p-3 p-md-5">
        <h5 class="font-weight-bold">{{ s.name }}</h5>
        <div class="d-flex font-smbd col-12 flex-wrap p-v-3">
          <div class="col-sm-12 col-md-6">
            <p><b>MGLT:</b> {{ s.MGLT }}</p>
            <p><b>Cargo capacity:</b> {{ s.cargo_capacity }}</p>
            <p><b>Consumables:</b> {{ s.consumables }}</p>
            <p><b>Cost:</b> {{ s.cost_in_credits }}</p>
            <p><b>Crew:</b> {{ s.crew }}</p>
            <p><b>Hyperdrive rating:</b> {{ s.hyperdrive_rating }}</p>
          </div>
          <div class="col-sm-12 col-md-6">
            <p><b>Length:</b> {{ s.length }}</p>
            <p><b>Manufacturer:</b> {{ s.manufacturer }}</p>
            <p><b>Max. Atm. Speed:</b> {{ s.max_atmosphering_speed }}</p>
            <p><b>Model:</b> {{ s.model }}</p>
            <p><b>Passengers:</b> {{ s.passengers }}</p>
            <p><b>Starship class:</b> {{ s.starship_class }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center p-5" v-if="error">
      <h3 class="text-center">Oops Starship not found!</h3>
    </div>
    <div
      class="d-flex flex-column justify-content-center align-items-center recently-view"
    >
      <h2 class="font-md font-smbd border p-h-4">Recently viewed Starships</h2>
      <hr class="d-block" />
      <div class="col-12 d-flex flex-wrap p-4">
        <starship
          v-for="(s, index) in recentStarships.slice(1)"
          v-bind="{ s, i: index }"
        ></starship>
      </div>
    </div>
  </detail>
</template>

<script>
import Detail from "../layouts/Detail";
import { apiConfig } from "../api-conf";
import * as http from "axios";
import Loading from "../components/Loading";
import CookieService from "../services/Cookie.service";
import Starship from "../components/Starship";

export default {
  data() {
    return {
      id: null,
      s: null,
      loading: true,
      recentStarships: [],
      error: false
    };
  },
  methods: {
    getStarship(id) {
      this.loading = true;
      this.error = false;
      http
        .get(`${apiConfig.starships}${id}/`)
        .then(response => {
          this.s = response.data;
          document.title = `${this.s.name} | Starship | Starwars`;
          this.recentStarships =
            CookieService.getObject("recentStarships") || [];
          this.recentStarships = this.recentStarships.filter(
            r => r.name !== this.s.name
          );
          this.recentStarships.unshift(this.s);
          if (this.recentStarships.length > 4) {
            this.recentStarships = this.recentStarships.slice(0, 4);
          }
          CookieService.putObject("recentStarships", this.recentStarships);
          this.loading = false;
        })
        .catch(() => {
          this.error = true;
          this.loading = false;
        });
    }
  },
  watch: {
    "$route.params"() {
      this.id = this.$route.params.id;
      this.getStarship(this.id);
    }
  },
  components: {
    Starship,
    Loading,
    Detail
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getStarship(this.id);
  }
};
</script>

<style scoped lang="scss">
.recently-view {
  hr {
    border-top: 2px solid #bbbbbb !important;
    width: 100% !important;
    margin: 0;
  }
}
</style>
