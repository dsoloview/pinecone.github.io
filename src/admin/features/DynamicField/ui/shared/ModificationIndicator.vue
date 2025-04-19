<script setup lang="ts">
defineProps<{
  isModified: boolean;
  hasOriginalData: boolean;
  tooltipText?: string;
}>();

defineEmits(["reset"]);
</script>

<template>
  <div v-if="isModified" class="text-xs flex items-center">
    <span class="text-amber-600 font-medium flex items-center">
      <UIcon name="i-lucide-edit" class="h-3 w-3 mr-1" />
      Modified
    </span>

    <UTooltip v-if="hasOriginalData" text="Reset to original value">
      <UButton
        size="xs"
        color="neutral"
        variant="ghost"
        class="ml-1"
        @click="$emit('reset')"
      >
        <UIcon name="i-lucide-undo" class="h-3 w-3" />
      </UButton>
    </UTooltip>
  </div>
</template>
