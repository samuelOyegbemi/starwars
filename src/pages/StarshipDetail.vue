<template>
  <detail :i="id" type="starship" count="4" :value="s">
    <loading :value="loading" class="p-5"></loading>
    <div class="col-12 d-flex justify-content-center" v-if="!loading && !error">
      <div v-if="s" class="col-10 col-md-8 col-lg-6 p-3 p-md-5">
        <h5 class="font-weight-bold">{{ s.name }}</h5>
        <div class="d-flex font-smbd col-12 flex-wrap">
          <div class="col-sm-12 col-md-6">
            <p>MGLT: {{ s.MGLT }}</p>
            <p>Cargo capacity: {{ s.cargo_capacity }}</p>
            <p>Consumables: {{ s.consumables }}</p>
            <p>Cost: {{ s.cost_in_credits }}</p>
            <p>Crew: {{ s.crew }}</p>
            <p>Hyperdrive rating: {{ s.hyperdrive_rating }}</p>
          </div>
          <div class="col-sm-12 col-md-6">
            <p>Length: {{ s.length }}</p>
            <p>Manufacturer: {{ s.manufacturer }}</p>
            <p>Max. Atm. Speed: {{ s.max_atmosphering_speed }}</p>
            <p>Model: {{ s.model }}</p>
            <p>Passengers: {{ s.passengers }}</p>
            <p>Starship class: {{ s.starship_class }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center p-5" v-if="error">
      <h3 class="text-center">Oops Starship not found!</h3>
    </div>
  </detail>
</template>

<script>
import Detail from "../layouts/Detail";
import { apiConfig } from "../api-conf";
import * as http from "axios";
import Loading from "../components/Loading";

export default {
  data() {
    return {
      id: null,
      s: null,
      loading: true,
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
    Loading,
    Detail
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getStarship(this.id);
  }
};
</script>
