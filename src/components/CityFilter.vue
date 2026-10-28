<!-- src/components/CityFilter.vue -->
<template>
  <div class="city-filter">
    <span class="city-label">📍 城市：</span>
    <el-dropdown v-model="visible" @command="handleSelect" trigger="click">
      <span class="city-button">
        {{ displayText }}
        <el-icon class="arrow">
          <ArrowDown />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="all">全部城市</el-dropdown-item>
          <el-dropdown-item v-for="item in cities" :key="item" :command="item">
            {{ item }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'all'
  },
  cities: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['update:modelValue'])

const visible = ref(false)

const displayText = computed(() => {
  if (!props.modelValue || props.modelValue === 'all') {
    return '请选择城市'
  }
  return props.modelValue
})

const handleSelect = (command) => {
  emit('update:modelValue', command)
  visible.value = false
}
</script>

<style scoped>
.city-filter {
  display: inline-flex;
  align-items: center;
}
.city-label {
  font-size: 14px;
  color: #606266;
  margin-right: 8px;
}
.city-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: #ffffff;
  border: 1px solid #e4e7ed;
  border-radius: 24px;
  font-size: 14px;
  color: #303133;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}
.city-button:hover {
  border-color: #667eea;
}
.arrow {
  font-size: 12px;
  color: #909399;
}
</style>
