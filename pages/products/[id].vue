<template>
    <div class="flex flex-col gap-5 p-5" v-if="product">
        <h1 class="text-2xl">Product Details</h1>
        <pre>Category: {{ product.category.name }}</pre>
        <div class="flex gap-5">
            <UButton icon="i-heroicons-pencil-square" size="sm" color="primary" variant="solid" label="Update"
                :trailing="false" @click="handleUpdate" />
            <UButton size="md" color="red" variant="solid" label="Delete" :trailing="false" @click="handleDelete" />
        </div>
        <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-10">
                <div class="flex flex-col items-center gap-5">
                    <h2 class="text-2xl">Images</h2>
                    <ul v-if="product.images.length > 0" class="flex flex-row gap-5">
                        <li v-for="image in product.images" :key="image">
                            <img class="h-[300px] w-screen object-cover" :src="image" alt="Product Image">
                        </li>
                    </ul>
                    <p v-else>No images available.</p>
                </div>
                <div class="flex flex-col items-start gap-2">
                    <h2 class="text-2xl flex w-screen justify-center">{{ product.title }}</h2>
                    <div class="w-[400px] gap-2">
                        <pre class="text-xl">Price: ${{ product.price }}</pre>
                    </div>
                    <div class="w-[400px] gap-2">
                        <h2 class="text-xl">Description:</h2>
                        <h2 class="text-l">{{ product.description }}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const product = ref(null);
const router = useRouter();
const productId = router.currentRoute.value.params.id;
onMounted(async () => {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
        product.value = await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
    }
});
function handleUpdate() {
    router.push({ path: `/products/update-product/${productId}` })
}
async function handleDelete() {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Product deleted successfully');
            router.push('/products')
        } else {
            console.error('Failed to delete product:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

</script>
  