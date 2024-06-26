<script setup lang="ts">
import { ref } from "vue";
import AddFirstPlayer from "./AddFirstPlayer.vue";
import AddSecondPlayer from "./AddSecondPlayer.vue";
import GamePage from "./GamePage.vue";
import WinnerResult from "./WinnerResult.vue";
import DrawResult from "./DrawResult.vue";

const currentStep = ref(1);
const players = ref<string[]>([]);
const winner = ref<string | null>(null);
const isDraw = ref(false);

const handleStartGame = (name: string) => {
    players.value.push(name);
    if (currentStep.value === 1) {
        currentStep.value = 2;
    } else if (currentStep.value === 2) {
        currentStep.value = 3; 
    } else if (currentStep.value === 3) {
        currentStep.value = 4;
    } else {
        console.log('All players', players.value);
        currentStep.value = 1;
        players.value = [];
    }
}

const handleGameOver = (winningPlayer: string | null) => {
    winner.value = winningPlayer;
    isDraw.value = false;
    currentStep.value = 4;
}

const handleGameDraw = () => {
    isDraw.value = true;
    currentStep.value = 5;
}

const handlePlayAgain = () => {
    currentStep.value = 3;
    winner.value = null;
    isDraw.value = false;
}

const handleBackToStart = () => {
    currentStep.value = 1;
    players.value = [];
    winner.value = null;
    isDraw.value = false;
}
</script>

<template>
    <div v-if="currentStep === 1">
        <AddFirstPlayer @save-player="handleStartGame"></AddFirstPlayer>
    </div>

    <div v-else-if="currentStep === 2">
        <AddSecondPlayer @save-player="handleStartGame"></AddSecondPlayer>
    </div>

    <div v-else-if="currentStep === 3">
        <GamePage @game-over="handleGameOver" @game-draw="handleGameDraw"></GamePage>
    </div>

    <div v-else-if="currentStep === 4">
        <WinnerResult :winner="winner" @playAgain="handlePlayAgain" @backToStart="handleBackToStart"></WinnerResult>
    </div>

    <div v-else-if="currentStep === 5">
        <DrawResult @playAgain="handlePlayAgain" @backToStart="handleBackToStart"></DrawResult>
    </div>
</template>