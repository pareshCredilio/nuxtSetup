<template>
  <div class="grid grid-cols-3 gap-5 p-5">
    <UCard
      v-for="item in items"
      :key="item.id"
      class="w-[100%]"
      :ui="{
        header: {
          padding: '',
        },
      }"
    >
      <template #header>
        <div class="p-[-10px]">
          <img
            :src="item.images[0]"
            alt=""
            class="w-[100%] h-[300px] object-cover rounded-t-lg"
          />
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
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const items = ref([]);

onMounted(() => {
  try {
    fetchData();
  } catch (error) {
    console.error(error);
  }
});

async function fetchData() {
  const apiUrl = "https://api.escuelajs.co/api/v1/products";
  const response = await fetch(apiUrl);
  items.value = await response.json();
}
</script>
