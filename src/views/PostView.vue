<!-- src/views/PostView.vue -->
<template>
<div class="post-page">
  <!-- 顶部装饰色块 -->
  <div class="decor-top"></div>
  <div class="container">
    <div class="page-header">
      <div class="icon-box">💼</div>
      <h1>发布新岗位</h1>
      <p>填写岗位信息，发布后岗位将展示在首页岗位列表</p>
    </div>

    <el-card class="form-card" shadow="hover">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="110px"
        class="job-form"
      >
        <!-- 岗位基础信息分组 -->
        <div class="form-group">
          <h3 class="group-title">
            <span class="dot blue"></span>岗位基础信息
          </h3>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="岗位名称" prop="position">
                <el-input v-model="form.position" placeholder="请输入岗位名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司名称" prop="company">
                <el-input v-model="form.company" placeholder="请输入公司名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="薪资范围" prop="salary">
                <el-input v-model="form.salary" placeholder="例如：20-35K"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工作城市" prop="city">
                <el-select v-model="form.city" placeholder="选择城市" style="width:100%">
                  <el-option label="北京" value="北京"></el-option>
                  <el-option label="杭州" value="杭州"></el-option>
                  <el-option label="上海" value="上海"></el-option>
                  <el-option label="广州" value="广州"></el-option>
                  <el-option label="深圳" value="深圳"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="公司Logo地址" prop="logo">
            <el-input v-model="form.logo" placeholder="图片链接，例如 https://picsum.photos/seed/xxx/80/80"></el-input>
          </el-form-item>
          <el-form-item label="是否急聘">
            <el-switch v-model="form.isUrgent" active-text="急聘"></el-switch>
          </el-form-item>
        </div>

        <!-- 岗位详情分组 -->
        <div class="form-group">
          <h3 class="group-title">
            <span class="dot purple"></span>岗位详情
          </h3>
          <el-form-item label="岗位描述" prop="description">
            <el-input
              v-model="form.description"
              type="textarea"
              :rows="5"
              placeholder="填写岗位职责、任职要求、福利信息..."
            ></el-input>
          </el-form-item>
        </div>

        <!-- 按钮区域 -->
        <el-form-item class="btn-group">
          <el-button type="primary" size="large" @click="submitForm">提交发布</el-button>
          <el-button size="large" @click="resetForm">重置表单</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部小装饰文字 -->
    <div class="footer-tip">
      ✨ 信息填写完成后提交，岗位即刻上线岗位列表
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useJobStore } from '../stores/jobStore'

const router = useRouter()
const jobStore = useJobStore()

const formRef = ref(null)
// 表单数据结构和mockJobs完全对齐
const form = ref({
  position: '',
  company: '',
  logo: '',
  salary: '',
  city: '',
  isUrgent: false,
  description: '',
})

// 表单校验规则
const rules = ref({
  position: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
  company: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
  logo: [{ required: true, message: '请填写logo图片链接', trigger: 'blur' }],
  salary: [{ required: true, message: '请填写薪资范围', trigger: 'blur' }],
  city: [{ required: true, message: '请选择工作城市', trigger: 'change' }],
  description: [{ required: true, message: '请填写岗位描述', trigger: 'blur' }],
})

// 提交表单
const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      const newJob = {
        id: Date.now(),
        ...form.value,
        isFavorite: false
      }
      jobStore.addJob(newJob)
      ElMessage.success('🎉岗位发布成功！自动跳转到首页查看')
      router.push('/')
    } else {
      ElMessage.error('⚠️请检查表单填写项！')
      return false
    }
  })
}

// 重置表单
const resetForm = () => {
  formRef.value.resetFields()
}
</script>

<style scoped>
.post-page {
  min-height: 100vh;
  background: linear-gradient(120deg, #f7f8fc 0%, #f0f2fd 100%);
  position: relative;
  overflow: hidden;
}
/* 顶部渐变装饰条 */
.decor-top {
  height: 6px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}
.container {
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
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
.form-card {
  padding: 30px;
  border-radius:16px;
  background-color: #ffffff;
}
.job-form {
  margin-top:10px;
}
.form-group {
  margin-bottom:32px;
}
.group-title {
  font-size:17px;
  color:#444;
  padding-bottom:10px;
  border-bottom:1px solid #e4e7ed;
  margin-bottom:20px;
  display:flex;
  align-items:center;
  gap: 8px;
}
.dot {
  width: 10px;
  height:10px;
  border-radius:50%;
}
.dot.blue{
  background-color:#667eea;
}
.dot.purple{
  background-color:#764ba2;
}
.btn-group {
  margin-top:30px;
  text-align:center;
}
.btn-group .el-button {
  min-width:140px;
  margin:0 8px;
}
.footer-tip{
  text-align:center;
  margin-top:24px;
  color:#888;
  font-size:14px;
}
</style>
