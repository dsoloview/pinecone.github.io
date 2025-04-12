<script setup lang="ts">
type Props = {
  translationKey: string;
};

defineProps<Props>();

const { tm, rt } = useI18n();
const getRandomMarginLeft = () => {
  return `${Math.floor(Math.random() * 51)}%`;
};

const getRandomDirection = () => {
  const directions = ["left", "right", "top", "bottom"];
  return directions[Math.floor(Math.random() * directions.length)];
};
</script>

<template>
  <div class="my-30 quotes flex flex-col gap-20">
    <div
      v-for="quote in tm(translationKey) as string"
      :key="quote"
      class="quote"
    >
      <span
        class="quote__text text-xl xl:text-2xl max-w-[300px] md:max-w-[600px]"
        :class="`from-${getRandomDirection()}`"
        :style="{ marginLeft: getRandomMarginLeft() }"
      >
        {{ rt(quote) }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.quote {
}

.quote__text {
  display: block;
  color: rgb(255, 253, 238);
  font-family: Forum, sans-serif;
  font-style: italic;
  white-space: normal;
  line-height: 22px;
  font-weight: 400;

  opacity: 0;
  position: relative;
}

.from-left {
  animation: slide-in-left 1s ease-in-out forwards;
}
.from-right {
  animation: slide-in-right 1s ease-in-out forwards;
}
.from-top {
  animation: slide-in-top 1s ease-in-out forwards;
}
.from-bottom {
  animation: slide-in-bottom 1s ease-in-out forwards;
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-500px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(500px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-top {
  from {
    opacity: 0;
    transform: translateY(-500px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-bottom {
  from {
    opacity: 0;
    transform: translateY(500px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
