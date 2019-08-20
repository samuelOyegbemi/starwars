<template>
  <main-layout :q="q">
    <div>
      <headings title="Starwars Characters"></headings>
      <loading class="p-5" :value="loading"></loading>
      <div v-if="!loading">
        <div class="col-12 d-flex p-h-4 p-v-4">
          <div class="p-h-2 form-inline">
            <label for="filter" class="font-normal p-h-2">FILTER </label>
            <select
              name="filters"
              id="filter"
              class="form-control"
              :value="filter"
              @change="onFilter($event)"
            >
              <option value="">NONE</option>
              <option value="male">MALE</option>
              <option value="female">FEMALE</option>
              <option value="n/a">ROBOT</option>
            </select>
          </div>
          <div class="p-h-2 form-inline">
            <label for="view" class="font-normal p-h-2">VIEW </label>
            <select name="filters" id="view" class="form-control">
              <option value="grid">GRID</option>
            </select>
          </div>
        </div>
        <div class="col-12 d-flex flex-wrap p-4">
          <people
            v-for="(p, index) in people"
            v-bind="{ p, i: index }"
          ></people>
        </div>
        <div
          class="d-flex justify-content-center align-content-center p-3 pb-5"
        >
          <span class="p-h-3">{{
            `${startAt} - ${Math.min(startAt + 9, response.count)} of ${
              response.count
            }`
          }}</span>
          <div class="btn-group" role="group" aria-label="Pagination">
            <button
              type="button"
              class="btn btn-outline-dark p-h-3 p-v-1"
              @click="paginate(response.previous)"
              :disabled="startAt <= 1"
            >
              <font-awesome-icon icon="angle-left"></font-awesome-icon>
            </button>
            <button
              type="button"
              class="btn btn-outline-dark  p-h-3 p-v-1"
              @click="paginate(response.next)"
              :disabled="
                Math.min(startAt + 9, response.count) >= response.count
              "
            >
              <font-awesome-icon icon="angle-right"></font-awesome-icon>
            </button>
          </div>
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
import People from "../components/People";
import Loading from "../components/Loading";
import { UtilityService } from "../services/Utilty.service";

export default {
  components: {
    MainLayout,
    Headings,
    People,
    Loading
  },
  data() {
    return {
      people: null,
      response: null,
      q: null,
      startAt: 1,
      filter: "",
      currentUrl: "",
      loading: true,
      errored: false
    };
  },
  methods: {
    onFilter(event) {
      this.filter = event.target.value;
      this.people = this.doFiltering();
    },
    doFiltering() {
      return this.filter
        ? (this.response.results || []).filter(p => p.gender === this.filter)
        : this.response.results;
    },
    paginate: function(url) {
      if (url) {
        this.loading = true;
        this.errored = false;
        this.q = this.$route.query.search;
        http
          .get(UtilityService.updateQueryParam(url, "search", this.q))
          .then(response => {
            this.filter = ""; //reset filter so as not to confuse user
            this.response = response.data;
            this.people = this.doFiltering();
            this.startAt = UtilityService.getStartNum(this.response.previous);
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
            this.errored = true;
          });
      }
    }
  },
  mounted() {
    this.paginate(apiConfig.people);
  }
};
</script>

<style scoped lang="scss">
.view-more {
  min-width: 400px !important;
}
</style>
