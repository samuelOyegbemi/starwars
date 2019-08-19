<template>
  <div class="loader-liner" v-if="value">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    value: null
  }
};
</script>

<style scoped lang="scss">
.loader-liner {
  display: flex;
  width: inherit;
  height: inherit;
  align-items: center;
  justify-content: center;
}
.loader-liner div {
  width: 6px;
  height: 6px;
  margin: 10px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
  animation: zoom-in 1.2s cubic-bezier(0, 0.25, 0.5, 1) infinite;
}
.loader-liner div:nth-child(1) {
  animation-delay: -0.5s;
}
.loader-liner div:nth-child(2) {
  animation-delay: -0.25s;
}
.loader-liner div:nth-child(3) {
  animation-delay: 0s;
}

@keyframes zoom-in {
  0% {
    transform: scale(4);
  }
  50%,
  100% {
    transform: scale(2);
  }
}
</style>
