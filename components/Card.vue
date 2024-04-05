<template>
  <div class="grid grid-cols-3 gap-5 p-5">
    <UCard v-for="item in paginatedItems" :key="item.id" class="w-[100%]" :ui="{
      header: {
        base: '',
        background: '',
        padding: '',
      },
    }">
      <template #header>
        <div class="p-[-10px]">
          <img :src="item.images[0]" alt="" class="w-[100%] h-[300px] object-cover rounded-t-lg" />
        </div>
      </template>
      <div class="flex justify-around">
        <span>
          {{ item.title }}
        </span>
        <span> Price: ${{ item.price }} </span>
      </div>
    </UCard>
  </div>
  <div class="flex p-5 w-full items-center justify-end">
    <UPagination v-model="currentPage" :page-count="numPages" :total="items.length" @change="handleChange" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
const currentPage = ref(1);
const itemsPerPage = 9;
const items = ref([]);
const paginatedItems = ref([])

onMounted(() => {
  try {
    fetchData();
    categoryItems()
  } catch (error) {
    console.error(error);
  }
})

watch(currentPage, (newPage) => {
  const startIndex = (newPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  paginatedItems.value = items.value.slice(startIndex, endIndex);
})

async function fetchData() {
  const apiUrl = "https://api.escuelajs.co/api/v1/products";
  const response = await fetch(apiUrl)
  items.value = await response.json()
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  paginatedItems.value = items.value.slice(startIndex, endIndex);
}
function handleChange(page) {
  currentPage.value = page;
}

</script>
