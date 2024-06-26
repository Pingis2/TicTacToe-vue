<script setup lang="ts">
import { onMounted, ref } from 'vue';

const emit = defineEmits<{
    (e: "colorBoxRed"):void;
    (e: "colorBoxBlue"):void;
    (e: "gameOver", winner: string): void;
    (e: "gameDraw"): void;
}>();

const boxes = ref<number[]>([]);
const redColoredBoxIndex = ref<number[]>([]);
const blueColoredBoxIndex = ref<number[]>([]);
const isRedTurn = ref(true);
const firstUserName = sessionStorage.getItem('firstUserName') || 'Player 1';
const secondUserName = sessionStorage.getItem('secondUserName') || 'Player 2';
const currentPlayer = ref(firstUserName);
const gameOver = ref(false);

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]    
]

const displayBoxGrid = () => {
    boxes.value = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

const checkWin = (coloredBoxIndex: number[]): boolean => {
    return winningCombinations.some(combination => 
        combination.every(index => coloredBoxIndex.includes(index))
    );
}

const checkDraw = (): boolean => {
    return (redColoredBoxIndex.value.length + blueColoredBoxIndex.value.length) === boxes.value.length;
}

onMounted(() => {
    displayBoxGrid();
    console.log(boxes.value)
})

const handleClickOnBox = (index: number) => {
    if (gameOver.value || redColoredBoxIndex.value.includes(index) || blueColoredBoxIndex.value.includes(index)) {
        return;
    }

    if (isRedTurn.value) {
        redColoredBoxIndex.value.push(index);
        emit('colorBoxRed');

        if (checkWin(redColoredBoxIndex.value)) {
            gameOver.value = true;
            emit('gameOver', firstUserName);
        } else {
            isRedTurn.value = false;
            currentPlayer.value = secondUserName;
        }
        
        
    } else {
        blueColoredBoxIndex.value.push(index);
        emit('colorBoxBlue');

        if (checkWin(blueColoredBoxIndex.value)) {
            gameOver.value = true;
            emit('gameOver', secondUserName);
        } else {
            isRedTurn.value = true;
            currentPlayer.value = firstUserName;
        }
    }

    if (checkDraw() && !gameOver.value) {
        gameOver.value = true;
        emit('gameDraw');
    }
    
    console.log('red boxes', redColoredBoxIndex.value);
    console.log('blue boxes', blueColoredBoxIndex.value);
    console.log(boxes.value);
}
</script>

<template>
    <main>
        <h2>{{ currentPlayer }}'s tur</h2>
        <div class="grid">
            <div v-for="(box, index) in boxes" 
                :key="index" 
                :class="['box', {red: redColoredBoxIndex.includes(index)}, {blue: blueColoredBoxIndex.includes(index)}]" 
                @click="() => handleClickOnBox(index)"
            >
                {{ index + 1 }}
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    margin: 0 auto 0 auto;
}

.grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 700px;
}

.box {
    width: 200px;
    height: 200px;
    border: 1px white solid;
    cursor: pointer;
}

.red {
    background-color: red;
}

.blue {
    background-color: blue;
}
</style>