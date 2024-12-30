import { createMemo, For } from 'solid-js'
import { useI18n } from '~/i18n/usei18n.hook' // Make sure to import the useI18n hook
import { IconAddress } from '~/lib/svg'

export default function Footer() {
  // 提取常用样式类为常量
  const LINK_CLASSES = 'no-underline text-stone-500 transition-color duration-[250ms] hover:text-white'

  // Get the translate function and actions from I18nContext
  const [t, { locale }] = useI18n()
  // 切换语言的函数
  const switchLanguage = (language) => {
    locale(language)
  }

  const data = createMemo(() => t('footer'))

  // 将固定内容提取出来避免重渲染
  const SocialLinks = () => (
    <div class="sm:flex sm:items-center sm:justify-between">
      <span class="text-xs text-gray-500 sm:text-center">
        © 2025
        {' '}
        <a href="#" class="text-white no-underline">SJIUS™</a>
        . All Rights Reserved.
      </span>
      <div class="flex mt-4 sm:justify-center sm:mt-0">
        <a href="#" class="no-underline text-white transition-color duration-[250ms] hover:text-stone-500">
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 8 19"
          >
            <path
              fill-rule="evenodd"
              d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="sr-only">Facebook page</span>
        </a>
        <a href="#" class="no-underline text-white transition-color duration-[250ms] hover:text-stone-500 ml-5">
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 21 16"
          >
            <path
              d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"
            />
          </svg>
          <span class="sr-only">Twitter page</span>
        </a>
      </div>
    </div>
  )

  // 抽离列组件，避免父组件重渲染影响
  const FooterColumn = (props) => {
    const isLanguageColumn = () => props.index() === 2

    return (
      <div class="text-white">
        <h2 class="mb-6 text-sm font-semibold uppercase">{props.item.title}</h2>
        <ul class="font-medium">
          <For each={props.item.links}>
            {subItem => (
              <li class="text-sm mb-4 list-none">
                <a
                  {...(isLanguageColumn()
                    ? {
                        onClick: () => props.onLanguageSwitch(subItem.code),
                        href: '#',
                      }
                    : {})}
                  class={LINK_CLASSES}
                >
                  {subItem.label}
                </a>
              </li>
            )}
          </For>
        </ul>
      </div>
    )
  }

  return (
    <footer id="contact" class="bg-gray-900">
      <div class="mx-auto w-full py-6 max-w-screen-xl p-4 lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0 flex flex-col justify-between">
            <a href="#" class="flex items-center">
              <img src="img/logo-white.png" class="h-20 mr-3" alt="sjius Logo" />
            </a>
            <div class='text-white flex flex-col max-w-md'>
              <p class='text-xs'>{t('address')}</p>
              <p class='text-xs'>+86 18482317559 15928802635</p>
            </div>
          </div>
          <div class="text-white grid grid-cols-3 gap-4 sm:gap-24 sm:grid-cols-3">
            <For each={data()}>
              {(item, index) => (
                <FooterColumn
                  item={item}
                  index={index}
                  onLanguageSwitch={switchLanguage}
                />
              )}
            </For>
          </div>
        </div>
        <SocialLinks />
      </div>
    </footer>
  )
}
