<template>
  <div class="chart-container">
    <Line v-if="loaded" :data="chartData" :options="chartOptions" />
    <div v-else class="loading">Loading leading causes data...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const loaded = ref(false)
const chartData = ref({ labels: [], datasets: [] })
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Top 5 Leading Causes of Death in NYC Over Time'
    },
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 12 // Makes the legend a bit cleaner
      }
    }
  },
  scales: {
    x: {
      title: { display: true, text: 'Year' }
    },
    y: {
      stacked: true, // CRITICAL: This stacks the areas on top of each other
      beginAtZero: true,
      title: { display: true, text: 'Number of Deaths' }
    }
  }
})

onMounted(async () => {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json?$limit=10000')
    const rawData = await response.json()

    // 1. Find the top 5 causes overall (excluding the vague "All Other Causes")
    const causeTotals = {}
    rawData.forEach(row => {
      const cause = row.leading_cause
      const deaths = parseInt(row.deaths) || 0
      if (cause === 'All Other Causes' || !cause) return 
      
      causeTotals[cause] = (causeTotals[cause] || 0) + deaths
    })

    const top5Causes = Object.entries(causeTotals)
      .sort((a, b) => b[1] - a[1]) // Sort highest to lowest
      .slice(0, 5)                 // Grab the top 5
      .map(entry => entry[0])      // Extract just the names

    // 2. Get the unique years and sort them chronologically for the X-Axis
    const years = [...new Set(rawData.map(row => row.year))].sort()

    // 3. Define a nice color palette for our 5 areas
    const colors = [
      { bg: 'rgba(255, 99, 132, 0.7)', border: 'rgba(255, 99, 132, 1)' }, // Red
      { bg: 'rgba(54, 162, 235, 0.7)', border: 'rgba(54, 162, 235, 1)' }, // Blue
      { bg: 'rgba(255, 206, 86, 0.7)', border: 'rgba(255, 206, 86, 1)' }, // Yellow
      { bg: 'rgba(75, 192, 192, 0.7)', border: 'rgba(75, 192, 192, 1)' }, // Green
      { bg: 'rgba(153, 102, 255, 0.7)', border: 'rgba(153, 102, 255, 1)' }  // Purple
    ]

    // 4. Build a dataset for each of the top 5 causes
    const datasets = top5Causes.map((cause, index) => {
      // Calculate deaths for this specific cause, year by year
      const dataPoints = years.map(year => {
        return rawData
          .filter(row => row.leading_cause === cause && row.year === year)
          .reduce((sum, row) => sum + (parseInt(row.deaths) || 0), 0)
      })

      return {
        label: cause,
        data: dataPoints,
        fill: true, // Turns the line into an area
        backgroundColor: colors[index].bg,
        borderColor: colors[index].border,
        pointRadius: 2, // Keeps the data points small
        tension: 0.3 // Smooths the line curves
      }
    })

    // 5. Update the chart state
    chartData.value = {
      labels: years,
      datasets: datasets
    }

    loaded.value = true
  } catch (error) {
    console.error('Error fetching API data:', error)
  }
})
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 500px; /* Made slightly taller to accommodate the legend */
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: sans-serif;
  color: #666;
}
</style>