import { createContext, createEffect, createSignal, onCleanup, useContext } from 'solid-js'

const LenisContext = createContext()

export function LenisProvider(props) {
  const [lenis, setLenis] = createSignal(null)
  const [isLoading, setIsLoading] = createSignal(true) // Add loading state

  createEffect(() => {
    if (typeof window !== 'undefined') {
      import('lenis').then(({ default: Lenis }) => {
        const lenisInstance = new Lenis({
          smooth: true,
          duration: 1.2,
          smoothTouch: true,
          easing: t => Math.min(1, 1.001 - 2 ** (-10 * t)),
        })

        const animate = (time) => {
          lenisInstance?.raf(time)
          requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)

        setLenis(lenisInstance)
        setIsLoading(false) // Set loading to false once Lenis is ready

        onCleanup(() => { // Uncomment and fix cleanup
          lenisInstance?.destroy()
        })
      })
    }
  })

  return (
    <LenisContext.Provider value={{ lenis, isLoading }}>
      {props.children}
    </LenisContext.Provider>
  )
}

export function useLenis() {
  const context = useContext(LenisContext)

  if (typeof window !== 'undefined' && !context) {
    console.warn('useLenis must be used within a LenisProvider')
    return { lenis: null, isLoading: true }
  }

  return context
}
