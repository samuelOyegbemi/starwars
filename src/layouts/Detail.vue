<template>
  <div>
    <header
      class="d-flex flex-column justify-content-between"
      v-bind:style="{
        backgroundImage: `url(  ${getImage(i || 0, type, Number(count))} )`
      }"
    >
      <router-link to="/">
        <figure class="p-3 p-md-2 logo">
          <img src="../assets/logo.png" alt="logo" />
        </figure>
      </router-link>
      <div class="p-3 d-flex justify-content-between align-content-center">
        <div class="detail-wrapper d-flex">
          <div class="left bracket"></div>
          <div class="info font-weight-bold">{{ value ? value.name : "" }}</div>
          <div class="right bracket"></div>
        </div>
        <div class="d-flex">
          <router-link :to="`/${type}s/${navigateValue(-1)}`"
            ><div
              class="rounded-circle d-flex justify-content-center align-items-center"
            >
              <font-awesome-icon icon="caret-left"></font-awesome-icon>
            </div>
          </router-link>
          <router-link :to="`/${type}s/${navigateValue(1)}`"
            ><div
              class="rounded-circle d-flex justify-content-center align-items-center"
            >
              <font-awesome-icon icon="caret-right"></font-awesome-icon>
            </div>
          </router-link>
        </div>
      </div>
    </header>
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: null
    };
  },
  props: {
    i: null,
    type: null,
    count: null,
    value: { name }
  },
  methods: {
    getImage(i, type, imgCount = 3) {
      this.id = i;
      this.type = type;
      var images = require.context("../assets/", false, /\.jpg$/);
      return images(
        `./${type || "starship"}-${Number(i) % imgCount || imgCount}.jpg`
      );
    },
    navigateValue(changes) {
      let to = Number(this.id) + Number(changes);
      to = to > 0 ? to : 1;
      return to;
    }
  }
};
</script>

<style scoped lang="scss">
header {
  color: white;
  height: 400px;
  max-height: 400px;
  background-position: 50%;
  padding: 30px;
  img {
    height: 50px;
  }
  @media screen and (max-height: 576px) {
    img {
      height: 30px;
    }
    .rounded-circle {
      width: 30px !important;
      height: 30px !important;
    }
    background-size: 200%;
  }
  .detail-wrapper {
    min-width: 100px;
    padding: 15px 5vw;
    .bracket {
      width: 20px;
      border-bottom: 2px solid white;
      border-top: 2px solid white;
    }
    .left {
      border-left: 2px solid white;
    }
    .right {
      border-right: 2px solid white;
    }
  }
  .rounded-circle {
    margin: 10px;
    border: 2px solid white;
    width: 50px;
    height: 50px;
    cursor: pointer;
    color: white !important;
  }
}
</style>
