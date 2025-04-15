<template>
  <div class="w-full lg:p-2 mb-2">
    <label :for="name" class="w-full block mb-2">
      {{ label }}<span v-if="required" class="text-red-500">*</span>
    </label>
    <textarea
        v-model="modelValue"
        :name="name"
        :placeholder="placeholder"
        class="border border-amber-100 rounded-3xl p-2 w-full h-28"
    ></textarea>
    <span class="text-red-500">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
});


</script>