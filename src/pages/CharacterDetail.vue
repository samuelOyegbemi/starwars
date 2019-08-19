<template>
  <detail :i="id" type="character" count="4" :value="p">
    <loading :value="loading" class="p-5"></loading>
    <div class="col-12 d-flex justify-content-center" v-if="!loading && !error">
      <div v-if="p" class="col-10 col-md-8 col-lg-6 p-3 p-md-5">
        <h5 class="font-weight-bold">{{ p.name }}</h5>
        <div class="d-flex font-smbd col-12 flex-wrap">
          <div class="col-sm-12 col-md-6">
            <p>Birth year: {{ p.birth_year }}</p>
            <p>Eye color: {{ p.eye_color }}</p>
            <p>Gender: {{ p.gender }}</p>
            <p>Hair color: {{ p.hair_color }}</p>
          </div>
          <div class="col-sm-12 col-md-6">
            <p>Height: {{ p.height }}</p>
            <p>Mass: {{ p.mass }}</p>
            <p>Skin Color: {{ p.skin_color }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center p-5" v-if="error">
      <h3 class="text-center">Oops Character not found!</h3>
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
      p: null,
      loading: true,
      error: false
    };
  },
  methods: {
    getCharacter(id) {
      this.loading = true;
      this.error = false;
      http
        .get(`${apiConfig.people}${id}/`)
        .then(response => {
          this.p = response.data;
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
      this.getCharacter(this.id);
    }
  },
  components: {
    Loading,
    Detail
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getCharacter(this.id);
  }
};
</script>

<style>
.content {
  min-width: 300px;
  max-width: 600px;
  justify-self: center;
}
</style>
