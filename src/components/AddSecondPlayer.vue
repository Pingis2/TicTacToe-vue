<script setup lang="ts">
import { ref, defineEmits } from "vue";

const secondUser = ref("");
const secondUserColor = "Blue";

const handleNameSubmit = () => {
  console.log('namn', secondUser.value)
  if (secondUser.value) {
    sessionStorage.setItem('secondUserName', secondUser.value);
    sessionStorage.setItem('secondUserColor', secondUserColor);
    emit("savePlayer", secondUser.value);
    emit("savePlayerColor", secondUserColor);
  }
  
}

const emit = defineEmits<{
  (e: "savePlayer", text:string): void;
  (e: "savePlayerColor", text: string): void;
}>();

</script>

<template>
  <p>Spelare 2: Blå färg</p>
  <div @submit.prevent="handleNameSubmit">
    <input type="text" placeholder="Skriv ditt namn" v-model="secondUser">
    <button @click="handleNameSubmit">spara spelare och starta spelet</button>
  </div>
  
</template>

<style scoped>

</style>