<template>
  <div class="chart-container">
    <Line v-if="loaded" :data="chartData" :options="chartOptions" />
    <div v-else class="loading">Loading chart data...</div>
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
  Filler // CRITICAL: This plugin is required to color the area under the line
} from 'chart.js'

// Register Chart.js components
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

// State variables
const loaded = ref(false)
const chartData = ref({ labels: [], datasets: [] })
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Total NYC Deaths Over Time'
    },
    legend: {
      position: 'top'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Number of Deaths'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Year'
      }
    }
  }
})

onMounted(async () => {
  try {
    // Increase the limit to ensure we get a good sample of historical data
    const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json?$limit=10000')
    const rawData = await response.json()

    // Process Data: Group by year and sum up the deaths
    const deathsByYear = rawData.reduce((acc, curr) => {
      const year = curr.year
      // Safely parse the deaths (some API rows might have "." or missing data)
      const deaths = parseInt(curr.deaths) || 0
      
      acc[year] = (acc[year] || 0) + deaths
      return acc
    }, {})

    // Sort the years chronologically for the X-axis
    const labels = Object.keys(deathsByYear).sort()
    const dataValues = labels.map(year => deathsByYear[year])

    // Populate chart data
    chartData.value = {
      labels: labels,
      datasets: [
        {
          label: 'Total Deaths',
          data: dataValues,
          fill: true, // This turns the Line chart into an Area chart
          backgroundColor: 'rgba(54, 162, 235, 0.2)', // Semi-transparent fill
          borderColor: 'rgba(54, 162, 235, 1)',
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          tension: 0.4 // Adds a smooth curve to the line
        }
      ]
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
  height: 400px;
  width: 100%;
  max-width: 800px;
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