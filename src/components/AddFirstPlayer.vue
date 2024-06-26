<script setup lang="ts">
import { ref, defineEmits } from "vue";

const firstUser = ref("");
const firstUserColor = "Red";

const handleNameSubmit = () => {
  console.log('namn', firstUser.value)
  if (firstUser.value) {
    sessionStorage.setItem('firstUserName', firstUser.value);
    sessionStorage.setItem('firstUserColor', firstUserColor);
    emit("savePlayer", firstUser.value);
    emit("savePlayerColor", firstUserColor);
  }
  
}

const emit = defineEmits<{
  (e: "savePlayer", text:string): void;
  (e: "savePlayerColor", text: string): void;
}>();

</script>

<template>
  <p>Spelare 1: Röd färg</p>
  <div @submit.prevent="handleNameSubmit">
    <input type="text" placeholder="Skriv ditt namn" v-model="firstUser">
    <button @click="handleNameSubmit">spara spelare</button>
  </div>
  
</template>

<style scoped>

</style>
