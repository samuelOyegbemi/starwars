<template>
  <detail :i="id" type="character" count="4" :value="p">
    <loading :value="loading" class="p-5"></loading>
    <div class="col-12 d-flex justify-content-center" v-if="!loading && !error">
      <div v-if="p" class="col-10 col-md-8 p-3 p-md-5">
        <h5 class="font-weight-bold">{{ p.name }}</h5>
        <div class="d-flex font-smbd col-12 flex-wrap p-v-3">
          <div class="col-sm-12 col-md-6">
            <p><b>Birth year:</b> {{ p.birth_year }}</p>
            <p><b>Eye color:</b> {{ p.eye_color }}</p>
            <p><b>Gender:</b> {{ p.gender }}</p>
            <p><b>Hair color:</b> {{ p.hair_color }}</p>
          </div>
          <div class="col-sm-12 col-md-6">
            <p><b>Height:</b> {{ p.height }}</p>
            <p><b>Mass:</b> {{ p.mass }}</p>
            <p><b>Skin Color:</b> {{ p.skin_color }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center p-5" v-if="error">
      <h3 class="text-center">Oops Character not found!</h3>
    </div>
    <div
      class="d-flex flex-column justify-content-center align-items-center recently-view"
    >
      <h2 class="font-md font-smbd border p-h-4">Recently viewed Characters</h2>
      <hr class="d-block" />
      <div class="col-12 d-flex flex-wrap p-4">
        <people
          v-for="(p, index) in recentCharacters.slice(1)"
          v-bind="{ p, i: index }"
        ></people>
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
import People from "../components/People";

export default {
  data() {
    return {
      id: null,
      p: null,
      loading: true,
      recentCharacters: [],
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
          document.title = `${this.s.name} | Character | Starwars`;
          this.recentCharacters =
            CookieService.getObject("recentCharacters") || [];
          this.recentCharacters = this.recentCharacters.filter(
            r => r.name !== this.p.name
          );
          this.recentCharacters.unshift(this.p);
          if (this.recentCharacters.length > 3) {
            this.recentCharacters = this.recentCharacters.slice(0, 3);
          }
          CookieService.putObject("recentCharacters", this.recentCharacters);
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
    People,
    Loading,
    Detail
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getCharacter(this.id);
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
