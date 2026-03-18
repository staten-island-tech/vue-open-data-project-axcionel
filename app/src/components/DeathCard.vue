<template>
  <div class="card">
    <h2>{{ death.leading_cause }}</h2>
    <h3>Deaths: {{ death.deaths }}</h3>
    <p>{{ death.year }} | {{ death.sex }} | {{ death.race_ethnicity }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  death: {
    type: Object,
    required: true,
  }
})
</script>

<style scoped>
.card {
  width: 28%;
  height: 500px;
  background-color: aliceblue;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-transform: uppercase;
  text-align: center;
}
</style>