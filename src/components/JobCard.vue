<!-- src/components/JobCard.vue -->
<template>
  <div class="job-card" @click="handleClick">
    <div class="card-header">
      <img :src="job.logo" alt="公司Logo" class="company-logo" />
      <div class="company-info">
        <h3 class="position">{{ job.position }}</h3>
        <p class="company">{{ job.company }}</p>
      </div>
      <span v-if="job.isUrgent" class="tag-urgent">🔥 急聘</span>
    </div>
    <div class="card-body">
      <div class="info-row">
        <span class="label">💰 薪资</span>
        <span class="value salary">{{ job.salary }}</span>
      </div>
      <div class="info-row">
        <span class="label">📍 城市</span>
        <span class="value">{{ job.city }}</span>
      </div>
    </div>
    <div class="card-footer">
      <button
        class="btn-favorite"
        :class="{ 'is-favorite': isFavorited }"
        @click.stop="toggleFavorite"
      >
        {{ isFavorited ? '❤️ 已收藏' : '🤍 收藏' }}
      </button>
      <!-- 增加 @click.stop -->
      <button class="btn-detail" @click.stop="goDetail">查看详情 →</button>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router' // 新增路由
import { useJobStore } from '../stores/jobStore'

const props = defineProps({
  job: {
    type: Object,
    required: true
  }
})
const router = useRouter()
const jobStore = useJobStore()

// 判断收藏
const isFavorited = computed(() => jobStore.isFavorite(props.job.id))

// 切换收藏
const toggleFavorite = () => {
  jobStore.toggleFavorite(props.job.id)
}

// 卡片点击跳转
const handleClick = () => {
  router.push(`/job/${props.job.id}`)
}
// 按钮单独跳转
const goDetail = () => {
  router.push(`/job/${props.job.id}`)
}
</script>
<style scoped>
/* 你的全部原有样式完全保留不动 */
.job-card {
  background: white;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}
.job-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
  border-color: #667eea;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.company-logo {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid #eee;
}
.company-info {
  flex: 1;
}
.position {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #1a1a2e;
}
.company {
  font-size: 14px;
  color: #666;
  margin: 0;
}
.tag-urgent {
  background: #ff6b6b;
  color: white;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
}
.card-body {
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  padding: 12px 0;
  margin-bottom: 12px;
}
.info-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
}
.label {
  color: #999;
  font-size: 14px;
}
.value {
  color: #333;
  font-size: 14px;
}
.salary {
  color: #e74c3c;
  font-weight: 600;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-favorite {
  background: none;
  border: 1px solid #ddd;
  padding: 6px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}
.btn-favorite:hover {
  border-color: #667eea;
}
.btn-favorite.is-favorite {
  background: #fff0f0;
  border-color: #ff6b6b;
  color: #e74c3c;
}
.btn-detail {
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}
.btn-detail:hover {
  color: #764ba2;
}
</style>
