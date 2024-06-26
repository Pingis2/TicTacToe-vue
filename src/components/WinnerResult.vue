<script setup lang="ts">
import { defineProps  } from "vue";

const props = defineProps<{
    winner: string | null;
}>();
</script>

<template>
    <p>{{ winner }} har vunnit</p>
    <button @click="$emit('playAgain')">Spela igen</button>
    <button @click="$emit('backToStart')">Tillbaka till start</button>
</template>