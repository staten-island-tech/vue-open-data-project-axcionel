<template>
  <div class="container">
    <LeadingCausesChart />
  </div>
</template>

<script setup>
import LeadingCausesChart from '@/components/LeadingCausesChart.vue'
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