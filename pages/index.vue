<template>
  <div>
    <USelectMenu v-model="selected" :options="category" @change="handleCategorySelect"/>
  </div>
  <div>
    <Card :items="paginatedItems" />
  </div>
  <div class="flex pb-2 w-full items-center justify-end">
    <UPagination  v-model="currentPage" :page-count="6" :total="items.length" @change="handleChange" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
const currentPage = ref(1);
const itemsPerPage = 9;
const items = ref([]);
const paginatedItems = ref([])
const category = ref([])
const selected = ref(null)
onMounted(() => {
  fetchData();
  categories();
})

watch(currentPage, (newPage) => {
  const startIndex = (newPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  paginatedItems.value = items.value.slice(startIndex, endIndex);
})

const categories = async () => {
  const response = await fetch('https://api.escuelajs.co/api/v1/categories')
  const data = await response.json()
  category.value = data.map(item => item.name);
}
async function fetchData() {
  const apiUrl = "https://api.escuelajs.co/api/v1/products";
  const response = await fetch(apiUrl)
  items.value = await response.json()
  paginatedItems.value = items.value.slice(0, 9);
}
function handleChange(page: number) {
  currentPage.value = page;
}
function handleCategorySelect(selectedCategory) {
  selected.value = selectedCategory;
 const filteredItems= items.value.filter(item=> item.category.name===selected.value)
 paginatedItems.value = filteredItems
}

</script>