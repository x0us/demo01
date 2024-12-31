import { createEffect, createMemo, createSignal, For, onCleanup } from 'solid-js'
import { createStore } from 'solid-js/store'
import { useI18n } from '~/i18n/usei18n.hook' // Make sure to import the useI18n hook
import { IconAddress, IconCar, IconPath } from '~/lib/svg'

export default function Warehouse() {
  const [activeTab, setActiveTab] = createSignal(0)
  const [store, setStore] = createStore({
    indicatorStyle: {
      left: '0px',
      width: '0px',
      top: '0px',
    },
  })
  const [t] = useI18n()
  const data = createMemo(() => t('warehouse'))

  let tabsContainerRef
  let indicatorRef

  const updateIndicator = () => {
    if (tabsContainerRef && indicatorRef) {
      const activeTabElement = tabsContainerRef.querySelector(`[data-index="${activeTab()}"]`)
      if (activeTabElement) {
        const containerRect = tabsContainerRef.getBoundingClientRect()
        const activeTabRect = activeTabElement.getBoundingClientRect()

        setStore('indicatorStyle', {
          left: `${activeTabRect.left - containerRect.left}px`,
          width: `${activeTabRect.width}px`,
          top: `${activeTabRect.top - containerRect.top + activeTabRect.height}px`,
        })
      }
    }
  }

  createEffect(() => {
    activeTab()
    updateIndicator()
  })

  createEffect(() => {
    window.addEventListener('resize', updateIndicator)
    onCleanup(() => window.removeEventListener('resize', updateIndicator))
  })

  return (
    <>
      <div id="about" class="bg-center bg-no-repeat bg-cover bg-fixed text-white bg-[url('img/aeroport.jpeg')]">
        <div class="bg-[#121c45e6] pb-25">
          <div class="mx-auto px-4 sm:px-12 xl:max-w-6xl xl:px-0">
            <div class="pt-40 text-center">
              <h2 class="text-3xl font-bold md:text-4xl xl:text-5xl">
                {t('warehouseSection.heading')}
              </h2>
              <p class="mx-auto mt-6 md:w-3/4 lg:w-3/5">
                {t('warehouseSection.title')}
              </p>
            </div>

            <div class="relative mt-20">
            <div
                ref={tabsContainerRef}
                class="grid grid-cols-3 sm:flex justify-between sm:flex-wrap sm:gap-4 pb"
              >
                  <For each={data()}>
                    {(tab, index) => (
                      <button
                        data-index={index()}
                        role="tab"
                        aria-selected={activeTab() === index()}
                        aria-controls={`tabpanel-${index()}`}
                        tabIndex={activeTab() === index() ? 0 : -1}
                        class={`text-center py-4 px-4 text-sm font-medium tracking-wider transition-colors duration-200 sm:border-none focus:outline-none ${
                          index() > 2 ? 'col-span-1 sm:col-span-auto' : ''
                        } ${
                          activeTab() === index()
                            ? 'text-white'
                            : 'text-blue-400 hover:text-red-600'
                        } ${index() < 3 ? 'border-b border-blue-800' : ''} ${[1,4].includes(index()) ? 'border-l border-r border-blue-800' : ''}`} // 添加底部边框和右边框，0,3,6不添加左边框
                        onClick={() => setActiveTab(index())}
                      >
                        {tab.name}
                      </button>
                    )}
                  </For>
              </div>
              <div
                ref={indicatorRef}
                class="absolute transition-all duration-300 hidden h-0.5 bg-blue-400 ease-in-out sm:block"
                style={store.indicatorStyle}
              />
            </div>

            <div class="mt-20">
              <div class="md:flex gap-6 space-y-12 md:space-y-0">
                <div class="relative md:w-1/2">

                  <div class="inset-0 flex flex-col justify-center">
                    <div>
                      <h3 class="text-2xl font-bold text-white md:text-3xl pl-4 border-l-10 border-red-500">{t('warehouseSection.extra')}</h3>
                      <p class="text-stone-400 mt-8">{t('warehouseSection.description')}</p>
                      <div class="mt-12 space-y-6">
                        <div class="flex items-center gap-6">

                          <IconCar size="w-6" color="#ffffff" />
                          <p>
                            {' '}
                            {data()[activeTab()].capacity}
                            {' '}
                            <sup>cars/units</sup>
                          </p>

                        </div>
                        <div class="flex items-center gap-6">

                          <IconPath size="w-6" color="#ffffff" />
                          <p>{data()[activeTab()].extra}</p>

                        </div>
                        <div class="flex items-center gap-6">

                          <IconAddress size="w-6" color="#ffffff" />
                          <p class="text-sm" innerHTML={data()[activeTab()].address} />

                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="overflow-hidden sm:px-12 md:w-1/2 -m-4 sm:-mx-12 md:mx-0 md:overflow-visible md:px-0">
                  <div class="relative bg-gray-100 before:absolute before:inset-0 before:scale-x-110 before:border-y before:border-gray-200 after:absolute after:inset-0 after:scale-y-110 after:border-x after:border-gray-200 dark:bg-gray-800 dark:before:border-gray-700 dark:after:border-gray-700">
                    <img src={`img/${data()[activeTab()].img}`} class="mx-auto w-full border object-cover shadow-2xl dark:border-transparent min-h-[28rem]" alt="tailus screenshot" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
