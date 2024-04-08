<template>
    <UForm @submit="submitForm">
            <UFormGroup label="Username">
            <UInput type="text" v-model="formData.username" ref="usernameInput" />
             <div v-if="v$.$errors[0]?.$property=='username'" class=" text-red-600">
                {{ v$.$errors[0].$message }}
            </div>
        </UFormGroup>
        <UFormGroup label="Password">
            <UInput v-model="formData.password" type="password" ref="passwordInput" />
            <div class=" text-red-600" v-if="v$.$errors[0]?.$property=='password'">
                {{ v$.$errors[0].$message }}
            </div>
        </UFormGroup>
        <UButton type="submit">Submit</UButton>
    </UForm>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import useValidate from '@vuelidate/core';
import { required, minLength  } from '@vuelidate/validators';

const formData = reactive({
    username: '',
    password: '',
});

const rules = {
    username: { required },
    password: { required, minLength: minLength(6) },
};
const v$ = useValidate(rules, formData);
const passwordInput = ref<HTMLInputElement | null>(null);
const usernameInput = ref<HTMLInputElement | null>(null);

const submitForm = async (e: Event) => {
    const result = await v$.value.$validate();
    if (!result) {
        const firstInvalidField = v$.value.$errors[0].$property;
        if (firstInvalidField !== "username") {
            passwordInput.value.$refs.input.focus();
        } else {
            usernameInput.value.$refs.input.focus();
        }
    } else {
        alert('success');
    }
};
</script>