<template>
  <div>
    <UCard class="w-[100%]" @click="handleCardClick(items.id)">
      <template #header>
        <div class="p-[-10px]">
          <img :src="items.images[0]" alt="" class="w-[100%] h-[300px] object-cover rounded-t-lg" />
        </div>
      </template>
      <div class="flex justify-around">
        <span>
          {{ items.title }}
        </span>
        <span> Price: ${{ items.price }} </span>
      </div>
    </UCard>
  </div>
</template>

<script setup>

  const router = useRouter();
  const props = defineProps(['items'])
  const isLoading = ref(true);

function handleCardClick(productId) {
  router.push({
    path: `/products/${productId}`
  });
}
</script>