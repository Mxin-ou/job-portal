<!-- src/components/FilterBar.vue -->
<template>
  <div class="filter-bar">
    <button
      v-for="item in filters"
      :key="item.value"
      class="filter-btn"
      :class="{ active: modelValue === item.value }"
      @click="emit('update:modelValue', item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: 'all'
  }
})
const emit = defineEmits(['update:modelValue'])

const filters = [
  { label: '全部', value: 'all' },
  { label: '🔥急聘', value: 'urgent' },
  { label: '💰高薪', value: 'high' }
]
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 12px;
}
.filter-btn {
  padding: 8px 20px;
  border: 1px solid #e4e7ed;
  border-radius: 24px;
  background: #ffffff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.25s;
}
.filter-btn:hover {
  border-color: #667eea;
  color: #667eea;
}
.filter-btn.active {
  background-color: #667eea;
  color: white;
  border-color: #667eea;
}
</style>
