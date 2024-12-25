import { createEffect, createMemo, createSignal, For } from 'solid-js'
import { useI18n } from '~/i18n/usei18n.hook' // Make sure to import the useI18n hook
import { useLenis } from '~/lib/lenis'
import { IconClose } from '~/lib/svg'

export default function Nav() {
  const [menuOpen, setMenuOpen] = createSignal(false)
  const { lenis, isLoading } = useLenis()

  createEffect(() => {
    if (!isLoading() && lenis()) {
      lenis().on('scroll', (e) => {
        const scrollY = e.animatedScroll

        if (scrollY > 160) {
          navbar.classList.add('bg-white', 'text-black')
          navbar.classList.remove('bg-transparent', 'text-white')
        }
        else {
          navbar.classList.remove('bg-white', 'text-black')
          navbar.classList.add('bg-transparent', 'text-white')
        }
      })
    }
  })
  // Get the translate function and actions from I18nContext
  const [t] = useI18n()
  const data = createMemo(() => t('menu'))

  function scrollToSection(id) {
    // 平滑滚动到元素
    lenis().scrollTo(document.getElementById(id), {
      offset: 0, // 额外偏移量
      duration: 1.5, // 动画时长
    })
  }

  return (
    <>
      <nav
        id="navbar"
        class="text-white w-full flex duration-300 z-5 border-b-1 border-b-solid border-b-[#fff3] min-h-[88px] fixed inset-y-0 inset-t-0 inset-b-auto transition-all"
      >
        <div class="mx-auto flex items-center justify-between container">
          {/* Logo */}
          <img class="object-cover w-20 ml-4" src="img/logo.png" alt="Logo" />

          {/* Desktop Menu */}
          <div class="md:flex items-center justify-center hidden space-x-14">
            <For each={data()}>
              {(item, index) => (
                <a
                  onClick={() => scrollToSection(item.id)}
                  href={item.href}
                  class={
                    index() === data().length - 1
                      ? 'bg-red-600 px-8 py-5 text-red-100 no-underline hover:bg-red-500 transition duration-300'
                      : 'text-inherit no-underline transition-opacity duration-[250ms] hover:opacity-70'
                  }
                >
                  {item.label}
                </a>
              )}
            </For>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen())}
            id="menu-toggle"
            class="md:hidden mr-4"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>
      <div
        id="mobile-menu"
        class={`fixed top-0 right-0 h-full w-64 bg-[#121c45] text-white md:hidden z-10 transition-transform duration-300 ${
          menuOpen() ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div class="p-4 h-[96%]">
          {/* Close Button */}
          <button id="close-menu" class="mb-8" onClick={() => setMenuOpen(false)}>
            <IconClose color="currentColor" size="w-6 h-6" />
          </button>

          {/* Menu Items */}
          <div class="flex flex-col h-full">
            <div class="flex flex-col space-y-8">
              <For each={data().slice(0, -1)}>
                {(item, index) => (
                  <div
                    class="flex justify-between items-center text-white duration-[250ms] menu-item transition-opacity group"
                    onClick={() => scrollToSection(item.id)}
                  >
                    <img src={item.icon} class="w-5 group-hover:filter group-hover:brightness-60" alt={item.label} />
                    <a
                      href={item.href}
                      class="no-underline text-inherit group-hover:text-stone-4"
                    >
                      {item.label}
                    </a>
                  </div>
                )}
              </For>
            </div>

            {/* Logo at the Bottom */}
            <img
              src="img/logo-white.png"
              class="h-auto self-center w-1/4 mt-auto filter opacity-50"
              alt="Logo"
            />
          </div>
        </div>
      </div>

      {/* Mask */}
      <div
        class={`z-5 fixed inset-0 bg-black bg-opacity-80  transition-opacity duration-300 ease-in-out ${
          menuOpen() ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />
    </>
  )
}
