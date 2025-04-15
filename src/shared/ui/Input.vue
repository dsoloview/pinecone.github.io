<script setup lang="ts">
defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
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

<template>
  <div class="w-full lg:p-2">
    <label :for="name" class="w-full block mb-2">
      {{ label }}<span v-if="required" class="text-red-500">*</span>
    </label>
    <input
        v-model="modelValue"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        class="border border-amber-100 rounded-3xl p-2 w-full"
    />
    <span class="text-red-500">{{ error }}</span>
  </div>
</template>

<style scoped></style>
