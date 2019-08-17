<template>
  <div class="d-flex flex-column align-items-center pt-5">
    <h2 class="font-weight-bold">{{ title }}</h2>
    <hr class="m-1" />
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style scoped lang="scss">
div {
  color: rgba(10, 10, 0, 0.7);
}
hr {
  width: 100px !important;
  height: 0 !important;
  border-top: 10px solid gray !important;
}
</style>
