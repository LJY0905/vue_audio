<template>
  <div class="container">
    <Audio :audioUrl="audio2" />
  </div>
</template>
<script setup>
import Audio from "./components/Audio.vue";
import audio2 from "./assets/audio2.m4a";
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  width: 100%;
  height: 100%;
  background-color: #d9dbde;
}
</style>
