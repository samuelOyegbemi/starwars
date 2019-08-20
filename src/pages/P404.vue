<template>
  <main-layout>
    <div class="d-flex justify-content-center p-5">
      <h1 class="text-center">Oops Page not Found!</h1>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from "../layouts/Main.vue";

export default {
  components: {
    MainLayout
  }
};
</script>

<style scoped lang="scss">
.view-more {
  min-width: 400px !important;
}
</style>
