<template>
  <div class="flex flex-col gap-5">
    <div class="w-[300px] flex flex-row gap-3 items-center">
      <div>Category</div>
      <USelectMenu v-model="selectedName" :options="category" @change="handleCategorySelect" />
    </div>
    <div>
      <div class="grid grid-cols-3 gap-5 " v-if="!isLoading">
        <Card v-for="item in paginatedItems" class="hover:cursor-pointer" :items="item" />
      </div>
      <div v-else class="grid grid-cols-3 gap-5">
        <UCard v-for="index in ITEMS_PER_PAGE" class="h-[400px] w-[100%]">
          <USkeleton class="w-full h-[300px] bg-gray-200 mt-2 rounded" />
          <USkeleton class="w-full h-6 bg-gray-200 mt-2 rounded" />
        </UCard>
      </div>
    </div>
    <div v-if="!filteredItems.length">
      NO products to show
    </div>
    <div class="flex pb-2 w-full items-center justify-end">
      <UPagination v-model="currentPage" :page-count="ITEMS_PER_PAGE" :total="totalProducts" @click="handleChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Item {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  }
}

const currentPage = ref<number>(1);
const ITEMS_PER_PAGE = 6;
const items = ref<Item[]>([]);
const paginatedItems = ref<Item[]>([]);
const totalProducts = ref<Number>(0)
const category = ref<string[]>([]);
const categories = ref<Object>()
const selectedId = ref<number | null>(null);
const selectedName = ref<string | null>('All Products');
const filteredItems = ref<Item[]>([]);
const isLoading = ref<boolean>(true);

onMounted(() => {
  fetchData();
  fetchCategories();
})

watch(currentPage, (newPage: number) => {
  const startIndex = (newPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  paginatedItems.value = items.value.slice(startIndex, endIndex);
})

async function fetchCategories() {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/categories');
    const data = await response.json();
    categories.value = data;
    const categoryNames = data.map((item: { name: string }) => item.name);
    category.value = ['All Products', ...categoryNames];
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

async function fetchData(page: number = 1) {
  const apiUrl = `https://api.escuelajs.co/api/v1/products`;
  try {
    const response = await fetch(apiUrl)
    items.value = await response.json()
    filteredItems.value = items.value;
    totalProducts.value = items.value.length;
    paginatedItems.value = filteredItems.value.slice(0, ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Error fetching products", error);
  } finally {
    isLoading.value = false;
  }
}

async function fetchPaginatedData(page: number) {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const apiUrl = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${ITEMS_PER_PAGE}`;
  const response = await fetch(apiUrl)
  paginatedItems.value = await response.json()
  isLoading.value = false;
}

function handleChange() {
  fetchPaginatedData(currentPage.value);
}

async function handleCategorySelect(selectedCategoryName: string): Promise<void> {
  selectedName.value = selectedCategoryName;
  if (selectedCategoryName === 'All Products') {
    selectedId.value = null;
    return fetchData(currentPage.value);
  }
  const selectedCategory = categories.value.find(item => item.name === selectedCategoryName);
  if (selectedCategory) {
    selectedId.value = selectedCategory.id;
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${selectedId.value}`);
      const data = await response.json();
      filteredItems.value = data;
      paginatedItems.value = filteredItems.value.slice(0, ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
  }
}
const totalPages = computed(() => Math.ceil(filteredItems.value.length / ITEMS_PER_PAGE));
</script>