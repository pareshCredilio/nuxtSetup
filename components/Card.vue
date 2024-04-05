<template>
  <div class="grid grid-cols-3 gap-5 p-5">
    <UCard v-for="item in props.items" :key="item.id" class="w-[100%]" :ui="{
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
</template>

<script setup>
  const props = defineProps(['items'])
</script>