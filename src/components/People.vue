<template>
  <div class="col-12 col-md-6 p-3 d-flex wrapper slide">
    <img class="p-0" :src="getImage(i)" alt="" />
    <div class="detail p-3">
      <h3 class="font-normal font-weight-bold pt-5">{{ p.name }}</h3>
      <p>Birth year: {{ p.birth_year }}</p>
      <p>Gender: {{ p.gender }}</p>
      <router-link :to="`/characters/${getIndex(p.url)}`"
        >Read more</router-link
      >
    </div>
  </div>
</template>

<script>
import { UtilityService } from "../services/Utilty.service";

export default {
  props: ["p", "i"],
  methods: {
    getImage: i => {
      var images = require.context("../assets/", false, /\.jpg$/);
      return images(`./character-${(i % 4) + 1}.jpg`);
    },
    getIndex: url => {
      return UtilityService.getIndex(url);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/animation";

.wrapper {
  img {
    height: inherit !important;
    object-fit: cover;
    width: 60%;
  }
  .detail {
    background-color: #eeeeee;
    width: 40%;
  }
}
</style>
