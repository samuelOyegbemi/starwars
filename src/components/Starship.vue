<template>
  <div class="col-12 col-md-6 col-lg-4 p-3">
    <img class="col-12 p-0" :src="getImage(i)" alt="" />
    <div class="content p-2">
      <div class="m-1 d-flex flex-column align-self-end position-relative">
        <h5 class="p-1">{{ s.name }}</h5>
        <p class="card-text p-h-1 font-sm">
          {{ s.name }} was manufactured by {{ s.manufacturer }}
        </p>
        <a href="#" class="btn-dark align-self-end p-v-1 p-h-3 font-sm"
          ><span class="p-h-1">Read more</span>
          <font-awesome-icon icon="arrow-right" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["s", "i"],
  methods: {
    getImage: i => {
      var images = require.context("../assets/", false, /\.jpg$/);
      return images(`./starship-${(i % 3) + 1}.jpg`);
    }
  }
};
</script>

<style scoped lang="scss">
img {
  width: 96%;
  height: 200px;
}
.content {
  border-left: 10px solid #cccccc;
  border-bottom: 10px solid #cccccc;
  background-color: #eeeeee;
  p {
    line-height: 1.4;
    height: 30px;
  }
}
</style>
