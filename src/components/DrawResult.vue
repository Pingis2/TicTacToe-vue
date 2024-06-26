<script setup lang="ts">

</script>

<template>
    <p>Det blev oavgjort</p>
    <button @click="$emit('playAgain')">Spela igen</button>
    <button @click="$emit('backToStart')">Tillbaka till start</button>
</template>