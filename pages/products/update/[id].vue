<template>
    <UForm :state="state" v-if="product" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Title" name="title">
            <UInput v-model="state.title" />
        </UFormGroup>

        <UFormGroup label="Price" name="price">
            <UInput v-model.number="state.price" />
        </UFormGroup>

        <UFormGroup label="Description" name="description">
            <UTextarea v-model="state.description" />
        </UFormGroup>
        <UFormGroup label="category" name="category">
            <UInput v-model="state.category.name" />
        </UFormGroup>
        <UButton type="submit">
            Submit
        </UButton>
    </UForm>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

interface Product {
    id: number;
    title: string;
    price: string;
    description: string;
    images: string[];
    createdAt: string;
    updatedAt?: string;
    category: {
        id: number;
        name: string;
        image: string;
        createdAt: string;
        updatedAt: string;
    };
}



const router = useRouter();
const productId = router.currentRoute.value.params.id;
const product = ref<Product | null>(null);

const state = reactive({
    title: '',
    price: '',
    description: '',
    category: {
        name: ''
    }
})
onMounted(async () => {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
        if (response.ok) {
            product.value = await response.json();
            if (product.value) {
                state.title = product.value.title;
                state.price = product.value.price;
                state.description = product.value.description;
                state.category.name = product.value.category.name;
            }
        } else {
            console.error(`Failed to fetch product with id ${productId}`);
        }
    } catch (error) {
        console.error(error);
    }
});
async function updateCategory() {
    try {
        if (!product.value?.category?.id) {
            console.warn("Category ID not available for update");
            return;
        }

        const categoryId = product.value.category.id;
        const newCategoryName = product.value.category.name;

        const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newCategoryName }),
        })

        return response.ok;
    } catch (error) {
        console.error(error, "Failed to update category");
        throw error;
    }
}
async function onSubmit() {
    try {
        if (!product.value) {
            console.error("Product data is not available yet");
            return;
        }
        const updateData = {
            title: state.title,
            price: state.price,
            description: state.description,
        };
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
        });
        await updateCategory();
        if (response.ok) {
            alert('Product updated successfully!');
        } else {
            const errorData = await response.json();
            alert(`Update failed: ${errorData.error}`);
        }
    } catch (error) {
        console.error(error, "Failed to update product");
        alert('An error occurred. Please try again later.');
    }
}
</script>
