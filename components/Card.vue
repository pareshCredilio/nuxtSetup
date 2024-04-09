<template>
  <NuxtLink :to="`/products/${items.id}`">
    <UCard class="w-[full] max-h-[400px] overflow-hidden">
      <template #header>
        <div>
          <img :src="items.images?.[0]" alt="" class="w-[100%] h-[300px] object-cover rounded-t-lg" />
        </div>
      </template>
      <div class="flex justify-around" >
        <span class="truncate" :title="items?.title">
          {{ items.title }}
        </span>
        <span :title="items.price"> Price: ${{ items.price }} </span>
      </div>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Item } from '../types/index'
import { defineProps } from 'vue';

interface Props {
  items: Item[];
}
const props = defineProps<Props>();

</script>../types