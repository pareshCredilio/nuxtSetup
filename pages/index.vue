<template>
  <div class="flex flex-col p-5 gap-5">
    <div class="w-[300px] flex flex-row gap-3 items-center">
      <div>Category</div>
      <USelectMenu v-model="selectedName" :options="category" @change="handleCategorySelect" />
    </div>
  <div>
    <Card :items="paginatedItems" />
  </div>
  <div class="flex pb-2 w-full items-center justify-end">
    <UPagination v-model="currentPage" :page-count="10" :total="4" @change="handleChange" />
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Item{
  id:number;
  name:string;
  category:{
    id:number;
    name:string;
  }
}

const currentPage = ref<number>(1);
const itemsPerPage = 9;
const items = ref<Item[]>([]);
const paginatedItems = ref<Item[]>([]);
const category = ref<string[]>([]);
const selectedId = ref<number | null>(null);
const selectedName = ref<string | null>('All Products');
const filteredItems = ref<Item[]>([]);
const showPagination = ref<boolean>(true)
const isLoading = ref<boolean>(false);
const isFiltering = ref<boolean>(false);

onMounted(() => {
  fetchData();
  fetchCategories();
})

watch(currentPage, (newPage:number) => {
  const startIndex = (newPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  paginatedItems.value = items.value.slice(startIndex, endIndex);
})

async function fetchCategories() {
  const response = await fetch('https://api.escuelajs.co/api/v1/categories');
  const data = await response.json();
  const categoryNames = data.map((item: { name: string }) => item.name);
  category.value = ['All Products', ...categoryNames];
}

async function fetchData(page: number = 1) {
  isLoading.value = true;
  const apiUrl = "https://api.escuelajs.co/api/v1/products";
  const response = await fetch(apiUrl)
  items.value = await response.json()
  filteredItems.value = items.value;
  paginatedItems.value = filteredItems.value.slice(0, itemsPerPage);
  isLoading.value = false;
}
watch(currentPage, (newPage: number) => {
  fetchData(newPage);
});

function handleChange(page: number) {
  currentPage.value = page;
}
async function handleCategorySelect(selectedCategoryName: string): Promise<void> {
  selectedName.value = selectedCategoryName;
  if (selectedCategoryName === 'All Products') {
    selectedId.value = null;
    showPagination.value = true;
    fetchData(currentPage.value);
  } else {
    isFiltering.value = true;
    showPagination.value = false
    const response = await fetch('https://api.escuelajs.co/api/v1/categories');
    const categories = await response.json();
    const selectedCategory = categories.find((cat: { name: string }) => cat.name === selectedCategoryName);
    if (selectedCategory) {
      selectedId.value = selectedCategory.id;
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${selectedId.value}`);
        const data = await response.json();
        filteredItems.value = data;
        paginatedItems.value = filteredItems.value.slice(0, itemsPerPage);
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    }
    isFiltering.value = false;
  }
}

const skimmerItems = ref<Item[]>([]);
for (let i = 0; i < 9; i++) {
  skimmerItems.value.push({ id: i, name: '', category: { id: 0, name: '' } });
}

</script>