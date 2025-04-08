import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useMouse, useWindowSize } from '@vueuse/core'

export function useSmoothMouse(smoothing = 0.05, isMobile: boolean = false) {
    const { x, y } = useMouse()
    const { width, height } = useWindowSize()

    const smoothX = ref(x.value)
    const smoothY = ref(y.value)

    let animationFrame: number | null = null
    const touchX = ref(0)
    const touchY = ref(0)
    const isTouching = ref(false)

    const lerp = (start: number, end: number, alpha: number) => start + (end - start) * alpha

    const animate = () => {
        if (isMobile && isTouching.value) {
            smoothX.value = lerp(smoothX.value, touchX.value, smoothing)
            smoothY.value = lerp(smoothY.value, touchY.value, smoothing)
        } else {
            smoothX.value = lerp(smoothX.value, x.value, smoothing)
            smoothY.value = lerp(smoothY.value, y.value, smoothing)
        }
        animationFrame = requestAnimationFrame(animate)
    }

    const handleTouchMove = (event: TouchEvent) => {
        if (event.touches.length > 0) {
            const touch = event.touches[0]
            touchX.value = touch.clientX
            touchY.value = touch.clientY
            isTouching.value = true
        }
    }

    const handleTouchEnd = () => {
        isTouching.value = false
    }

    onMounted(() => {
        if (isMobile) {
            window.addEventListener('touchmove', handleTouchMove)
            window.addEventListener('touchend', handleTouchEnd)
        }
        animate()
    })

    onBeforeUnmount(() => {
        if (isMobile) {
            window.removeEventListener('touchmove', handleTouchMove)
            window.removeEventListener('touchend', handleTouchEnd)
        }
        if (animationFrame) cancelAnimationFrame(animationFrame)
    })

    const dx = computed(() => Math.abs(smoothX.value - width.value / 2))
    const dy = computed(() => Math.abs(smoothY.value - height.value / 2))
    const distance = computed(() => Math.sqrt(dx.value ** 2 + dy.value ** 2))

    const size = computed(() =>
        isMobile ? 200 : Math.max(800 - distance.value / 3, 200) // Увеличенный размер на мобильных
    )
    const opacity = computed(() =>
        isMobile ? 0.90 : Math.min(Math.max(size.value / 800, 0.7), 1) // Почти полная видимость на мобильных
    )



    return {
        smoothX,
        smoothY,
        size,
        opacity,
    }
}