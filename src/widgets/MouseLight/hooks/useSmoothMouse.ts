import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useMouse, useWindowSize } from '@vueuse/core'

export function useSmoothMouse(smoothing = 0.05) {
    const { x, y } = useMouse()
    const { width, height } = useWindowSize()

    const smoothX = ref(x.value)
    const smoothY = ref(y.value)

    let animationFrame: number | null = null

    const lerp = (start: number, end: number, alpha: number) => start + (end - start) * alpha

    const animate = () => {
        smoothX.value = lerp(smoothX.value, x.value, smoothing)
        smoothY.value = lerp(smoothY.value, y.value, smoothing)
        animationFrame = requestAnimationFrame(animate)
    }

    onMounted(() => {
        animate()
    })

    onBeforeUnmount(() => {
        if (animationFrame) cancelAnimationFrame(animationFrame)
    })

    const dx = computed(() => Math.abs(smoothX.value - width.value / 2))
    const dy = computed(() => Math.abs(smoothY.value - height.value / 2))
    const distance = computed(() => Math.sqrt(dx.value ** 2 + dy.value ** 2))

    const size = computed(() => Math.max(800 - distance.value / 3, 150))
    const opacity = computed(() => Math.min(Math.max(size.value / 800, 0.7), 1))

    return {
        smoothX,
        smoothY,
        size,
        opacity,
    }
}