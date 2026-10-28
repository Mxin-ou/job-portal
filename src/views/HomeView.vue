<!-- src/views/HomeView.vue -->
<template>
  <div class="home">
    <div class="hero">
      <h1>🚀 找到你的理想工作</h1>
      <p>海量名企岗位，精准匹配你的职业方向</p>
      <div class="stats">
        <span>📊 当前岗位 <strong>{{ totalCount }}</strong> 个</span>
        <span>🔥 急聘 <strong>{{ urgentCount }}</strong> 个</span>
      </div>
    </div>

    <div class="filter-row">
      <FilterBar v-model="filterType" />
      <CityFilter v-model="cityFilter" :cities="cityList" />
    </div>

    <JobList :jobs="filteredJobs" />

    <div v-if="totalCount === 0" class="empty-state">
      <p>暂无匹配的岗位，试试其他筛选条件吧</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'       // ⭐ 新增
import { ref, computed , watch } from 'vue'     //watch新增
import { useJobStore } from '../stores/jobStore'
import FilterBar from '../components/FilterBar.vue'
import CityFilter from '../components/CityFilter.vue'
import JobList from '../components/JobList.vue'

//调用，得到 route 和 router 对象
const route = useRoute()
const router = useRouter()

//使用Pinia store获取数据
const jobStore = useJobStore()

//初始化（和下面做对比）
const filterType = ref(route.query.filter || 'all')
const cityFilter = ref(route.query.city || 'all')
//const filterType = ref('all')
//const cityFilter = ref('all')

// 获取全部不重复城市，头部带上 all
const cityList = computed(() => {
  const cities = jobStore.jobs.map(job => job.city)
  return [...new Set(cities)]
})

// 第一步：城市筛选
const cityFilteredJobs = computed(() => {
  if (cityFilter.value === 'all') {
    return jobStore.jobs
  }
  return jobStore.jobs.filter(job => job.city === cityFilter.value)
})

// 第二步：急聘 / 高薪筛选
const filteredJobs = computed(() => {
  let jobs = cityFilteredJobs.value
  switch (filterType.value) {
    case 'urgent':
      jobs = jobs.filter(job => job.isUrgent)
      break
    case 'high':
      jobs = jobs.filter(job => parseInt(job.salary.split('-')[0]) >= 20)
      break
  }
  return jobs
})

const totalCount = computed(() => filteredJobs.value.length)
const urgentCount = computed(() => {
  return cityFilteredJobs.value.filter(job => job.isUrgent).length
})

// ========== ⭐ 核心：监听筛选变化 → 同步到 URL ==========
watch([filterType, cityFilter], ([newFilter, newCity]) => {
  // 构造新的 query 对象
  const query = {}
  
  // filter 不为 all 时才写入 URL
  if (newFilter && newFilter !== 'all') {
    query.filter = newFilter
  }
  
  // city 不为 all 时才写入 URL
  if (newCity && newCity !== 'all') {
    query.city = newCity
  }
  
  // 用 replace 而不是 push，避免每点一次都多一条历
  router.replace({ path: '/', query })
})

// ========== ⭐ 核心：监听筛选变化 → 同步到 URL ==========
//场景：用户点了浏览器后退按钮，或直接编辑 URL
watch(
  () => route.query,
  (nrwQuery =>{
  filterType.value = nrwQuery.filter || 'all'
  cityFilter.value = nrwQuery.city || 'all'
  } 
),
{ immediate: true }  // ← 关键！首次进入页面时也要从 URL 读取一次
)

// 导入函数
import { chatWithDeepSeek } from '../api/deepseek.js'
// 发送测试消息
//const result = await chatWithDeepSeek([
//{ role: 'user', content: '你好，请介绍一下自己' }
//])
//console.log(result)

</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
}
.hero {
  text-align: center;
  padding: 48px 0 32px;
}
.hero h1 {
  font-size: 36px;
  color: #1a1a2e;
  margin-bottom: 12px;
}
.hero p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}
.stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  font-size: 16px;
  color: #555;
}
.stats strong {
  color: #667eea;
  font-size: 20px;
}

/* 筛选行：左右分开，左边按钮组，右边城市下拉 */
.filter-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: #999;
  font-size: 18px;
}
</style>
