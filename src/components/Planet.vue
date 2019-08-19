<template>
  <div class="col-12 col-md-6 col-lg-4 p-3 wrapper d-flex">
    <img class="col-12 p-0" :src="getImage(i)" alt="" />
    <div class="col-12 d-flex position-absolute justify-content-between">
      <span>Temp.: {{ p.surface_water }}</span>
      <span>Population: {{ p.population }}</span>
    </div>
    <p class="planet-name font-md text-center">{{ p.name || "A planet" }}</p>
  </div>
</template>

<script>
export default {
  props: ["p", "i"],
  methods: {
    getImage: i => {
      var images = require.context("../assets/", false, /\.jpg$/);
      return images(`./planet-${(i % 3) + 1}.jpg`);
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  div {
    color: white;
  }
  height: 400px;
  img {
    width: inherit;
    object-fit: cover;
  }
  .planet-name {
    position: absolute;
    z-index: 2;
    overflow: hidden;
    color: white;
    text-overflow: ellipsis;
    bottom: 0;
    width: calc(100% - 35px);
    min-height: 20%;
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0.4)
    );
  }
}
</style>
