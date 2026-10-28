<!-- src/App.vue -->
<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <!-- 在所有页面显示AI助手 -->
    <AIAssistant />
  </div>
</template>
<script setup>
import Header from './components/Header.vue'
// 新增这一行
import AIAssistant from './components/AIAssistant.vue'
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f8f9fc;
}
#app {
  min-height: 100vh;
}
.main-content {
  min-height: calc(100vh - 80px);
}
</style>
