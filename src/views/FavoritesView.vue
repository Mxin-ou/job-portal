<!-- src/views/FavoritesView.vue -->
<template>
<div class="fav-page">
  <div class="decor-top"></div>
  <div class="container">
    <div class="page-header">
      <div class="icon-box">❤️</div>
      <h1>我的收藏</h1>
      <p>查看你收藏的全部岗位信息</p>
    </div>
    <div class="fav-section">
      <div class="title-row">
        <h3 class="section-title">
          <span class="dot purple"></span>收藏岗位
          <span class="total-count">共 {{ jobStore.favoriteJobs.length }} 个收藏</span>
        </h3>
        <!-- 注意这里绑定事件改成 clearFavorites -->
        <el-button v-if="jobStore.favoriteJobs.length > 0" type="danger" plain @click="clearFavorites">清空全部收藏</el-button>
      </div>
      <div class="job-grid">
        <JobCard v-for="job in jobStore.favoriteJobs" :key="job.id" :job="job"></JobCard>
      </div>
      <!-- 空状态 -->
      <el-empty v-if="jobStore.favoriteJobs.length === 0" description="暂无收藏岗位，去首页挑选喜欢的岗位吧！">
        <template #extra>
          <el-button type="primary" @click="$router.push('/')">前往首页</el-button>
        </template>
      </el-empty>
    </div>
  </div>
</div>
</template>

<script setup>
import { useJobStore } from '../stores/jobStore'
import JobCard from '../components/JobCard.vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const jobStore = useJobStore()
// ========== 清空收藏（带确认对话框） ==========
const clearFavorites = async () => {
  try {
    // 使用 Element Plus 的确认对话框
    await ElMessageBox.confirm(
      '确定要清空所有收藏吗？此操作不可撤销！',
      '确认清空',
      { type: 'warning' }
    )
    jobStore.clearFavorites()
    ElMessage.success('已清空所有收藏')
  } catch {
    // 用户点击取消，不做任何操作
  }
}
</script>

<style scoped>
.fav-page {
  min-height: 100vh;
  background: linear-gradient(120deg, #f7f8fc 0%, #f0f2fd 100%);
}
.decor-top {
  height: 6px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}
.page-header {
  text-align: center;
  margin-bottom: 32px;
}
.icon-box {
  width: 64px;
  height: 64px;
  line-height: 64px;
  font-size: 30px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border-radius: 50%;
  margin: 0 auto 16px;
}
.page-header h1 {
  font-size: 28px;
  color: #303133;
  margin:0 0 8px;
}
.page-header p {
  color: #74788d;
  font-size:15px;
}
.fav-section {
}
.title-row {
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:20px;
}
.section-title {
  font-size:18px;
  color:#444;
  display:flex;
  align-items:center;
  gap:8px;
}
.dot {
  width:10px;
  height:10px;
  border-radius:50%;
  background-color:#764ba2;
}
.total-count {
  margin-left:8px;
  font-size:14px;
  color:#909399;
}
.job-grid {
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap:24px;
}
</style>
