<template>
  <div class="app-layout">
    <nav class="navbar">
      <router-link to="/">Total Deaths Chart</router-link>
      <router-link to="/leading-causes">Leading Causes Chart</router-link>
    </nav>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
  margin-bottom: 30px;
}

/* Style the active link so the user knows what page they are on */
.router-link-active {
  font-weight: bold;
  color: #42b983; 
}
</style>