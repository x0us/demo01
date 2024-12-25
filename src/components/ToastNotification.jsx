import { createContext, createEffect, createSignal, onCleanup, useContext } from 'solid-js'
import { IconClose, IconSuccess } from '~/lib/svg'

const ToastContext = createContext()

export function ToastProvider(props) {
  const [isActive, setIsActive] = createSignal(false)
  const [progress, setProgress] = createSignal(100)
  const [isAnimating, setIsAnimating] = createSignal(false) // 用于阻止多次点击

  let timer

  const showToast = (message = 'Success', duration = 5000) => {
    if (isAnimating())
      return // 阻止多次点击

    setIsActive(true)
    setProgress(100)
    setIsAnimating(true)

    timer = setTimeout(() => {
      setIsActive(false)
      setIsAnimating(false) // 动画结束后允许点击
    }, duration)
  }

  const hideToast = () => {
    setIsActive(false)
    clearTimeout(timer)
    setIsAnimating(false) // 强制停止时重置状态
  }

  createEffect(() => {
    if (isActive()) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval)
            return 0
          }
          return prev - 2
        })
      }, 100)

      onCleanup(() => clearInterval(interval))
    }
  })

  return (
    <ToastContext.Provider value={{ showToast }}>
      {props.children}
      <div
        class={`fixed bottom-0 left-1/2 bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-500 ease-in-out translate-x--1/2 ${
          isActive() ? 'translate-y--4' : 'translate-y-full'
        }`}
      >
        <div class="p-4 pr-10">
          <div class="flex items-center">
            <div class="flex items-center justify-center text-white rounded-full w-8 h-8 bg-blue-500">
              <IconSuccess color="currentColor" size="w-6 h-6" />
            </div>
            <div class="ml-4">
              <p class="font-semibold text-gray-800">Success</p>
              <p class="text-sm text-gray-600">该功能需要与报价系统对接</p>
            </div>
          </div>
        </div>
        <button
          onClick={hideToast}
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <IconClose color="currentColor" size="w-6 h-6" />
        </button>
        <div class="h-1 bg-gray-200">
          <div
            class="h-full bg-blue-500 transition-all duration-100 ease-linear"
            style={{ width: `${progress()}%` }}
          />
        </div>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
