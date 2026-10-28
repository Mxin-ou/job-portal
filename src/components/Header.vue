<!-- src/components/Header.vue -->
<template>
  <header class="header">
    <div class="logo">
      <span class="icon">💼</span>
      <span class="title">就业职通车</span>
    </div>
    <nav class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/favorites" class="favorites-link">
        我的收藏
        <span class="badge" v-if="jobStore.favorites.length > 0">
          {{ jobStore.favorites.length }}
        </span>
      </router-link>
      <router-link to="/post" class="post-btn">发布岗位</router-link>
    </nav>
    <button class="login-btn" @click="toggleLogin">
      {{ isLoggedIn ? '退出登录' : '模拟登录'}}
    </button>
  </header>

</template>
<script setup>
import { ref } from 'vue'
import { useJobStore } from '../stores/jobStore'
const jobStore = useJobStore()
const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')

const toggleLogin = () => {
  isLoggedIn.value = !isLoggedIn.value
  localStorage.setItem('isLoggedIn',isLoggedIn,value)
  alert(isLoggedIn.value ? '登录成功！可以访问发布岗位了' : '')
}
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
}
.icon {
  font-size: 28px;
}
.nav {
  display: flex;
  align-items: center;
  gap: 24px;
}
.nav a {
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  font-size: 16px;
  padding: 6px 14px;
  border-radius: 6px;
  transition: all 0.3s;
}
.nav a:hover {
  color: white;
  background: rgba(255,255,255,0.2);
}
.post-btn {
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
}
/* 路由激活状态 */
.nav a.router-link-active {
  color: white;
  background: rgba(255,255,255,0.25);
}
.favorites-link {
  position: relative;
}
.badge {
  background: #ff6b6b;
  color: white;
  font-size: 12px;
  padding: 1px 8px;
  border-radius: 12px;
  margin-left: 4px;
  font-weight: bold;
}
</style>
