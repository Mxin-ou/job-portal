// src/stores/jobStore.js
import { defineStore } from 'pinia'
import { mockJobs } from '../mock/data'
// ========== 定义localStorage的键名（避免拼写错误） ==========
const STORAGE_KEY = 'job_portal_favorites'
export const useJobStore = defineStore('job', {
// ========== state：数据 ==========
state: () => ({
// 岗位数据（固定不变）
jobs: mockJobs,
// 收藏列表（从localStorage读取，如果没有则初始为空数组）
favorites: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}),
// ========== getters：计算属性 ==========
getters: {
// 岗位总数
totalJobs: (state) => state.jobs.length,
// 急聘岗位列表
urgentJobs: (state) => state.jobs.filter(job => job.isUrgent),
// 收藏的岗位列表（根据favorites中的id，从jobs中查找完整数据）
favoriteJobs: (state) => {
return state.jobs.filter(job => state.favorites.includes(job.id))
},
// 收藏数量
favoriteCount: (state) => state.favorites.length
},
// ========== actions：修改数据的方法 ==========
actions: {

// 切换收藏状态
toggleFavorite(id) {
// 查找id是否已在收藏列表中
const index = this.favorites.indexOf(id)
if (index > -1) {
// 已收藏 → 移除
this.favorites.splice(index, 1)
} else {
// 未收藏 → 添加
this.favorites.push(id)
}
// 关键步骤：同步保存到localStorage
localStorage.setItem(STORAGE_KEY, JSON.stringify(this.favorites))
},
// 判断是否已收藏
isFavorite(id) {
return this.favorites.includes(id)
},
// 清空所有收藏
clearFavorites() {
this.favorites = []
localStorage.setItem(STORAGE_KEY, JSON.stringify(this.favorites))
},
// ✅【新增】发布岗位：添加新岗位到列表
    addJob(job){
      this.jobs.unshift(job) // unshift：新增岗位放在最顶部
    }
}
})