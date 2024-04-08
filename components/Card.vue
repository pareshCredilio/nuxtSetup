<template>
  <div class="grid grid-cols-3 gap-5 p-5">
    <UCard v-if="!isLoading" v-for="item in items" :key="item.id" class="w-[100%]" @click="handleCardClick(item.id)">
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
    <UCard v-for="index in items" v-else class="h-[400px] w-[100%]">
      <USkeleton class="w-full h-[300px] bg-gray-200 mt-2 rounded" />
      <USkeleton class="w-full h-6 bg-gray-200 mt-2 rounded" />
    </UCard>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';

  const router = useRouter();
  const props = defineProps(['items'])
  const isLoading = ref(true);

  setTimeout(() => {
  isLoading.value = false;
}, 2000);

function handleCardClick(productId) {
  router.push({
    path: `/product/${productId}`
  });
}
</script>