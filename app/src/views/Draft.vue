<template>
  <div class="container">
    <DeathCard v-for="(cause) in deaths" :key="index" :death="cause" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DeathCard from '@/components/DeathCard.vue'

const deaths = ref([])

async function getDeaths() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json')
    const data = await response.json()
    deaths.value = data
  } catch (error) {
    console.log("Fetch error:", error)
  }
}

onMounted(() => {
  getDeaths()
})
</script>

<style scoped>
.container {
  width: 80vw;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>