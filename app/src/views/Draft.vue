<template>
  <div class="container">
    <NycDeathsChart />
  </div>
</template>

<script setup>
// Import the chart component
import NycDeathsChart from '@/components/NycDeathsChart.vue'

// We removed the ref([]) and getDeaths() function 
// because NycDeathsChart.vue is already doing that work!
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