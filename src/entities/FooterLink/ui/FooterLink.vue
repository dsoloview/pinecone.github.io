<script setup lang="ts">
type Props = {
  to: string
  external?: boolean
}

const props = defineProps<Props>()

const target = computed(() => (props.external ? '_blank' : ''))
</script>

<template>
  <NuxtLink
      class="footerLink flex items-center gap-3 justify-between text-white cursor-pointer uppercase transition-colors duration-200 xl:text-2xl text-lg"
      :target="target"
      :external="props.external"
      :to="props.to"
  >
    <slot />
    <Icon class="transition-colors duration-200" size="30px" name="uil:arrow-right" />
  </NuxtLink>
</template>

<style scoped lang="scss">
.footerLink:hover {
  color: var(--color-brown);
}

.footerLink:hover .icon {
  color: var(--color-brown);
}

.footerLink:hover > * {
  color: var(--color-brown);
}
</style>