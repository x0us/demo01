import { createMemo, For, createSignal, onCleanup, onMount } from 'solid-js'
import { useI18n } from '~/i18n/usei18n.hook'

export default function SectionIndexTop() {
  const [t] = useI18n()
  const data = createMemo(() => t('cardService'))
  const cards = createMemo(() => t('sectionIntro.cards'))

  const [isTopVisible, setIsTopVisible] = createSignal(false)
  const [isCarVisible, setIsCarVisible] = createSignal(false)
  let topRefs;
  let carRefs;

  onMount(() => {
    if (typeof IntersectionObserver !== 'undefined') {

      const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

          if (entry.target.id === 'topRefs') {
            
            if (entry.isIntersecting) {
      
              setIsTopVisible(true)
            } else {
              setIsTopVisible(false)
        
            }
          } else if (entry.target.id === 'carRefs') {
            if (entry.isIntersecting) {
              setIsCarVisible(true)
            } else {
              setIsCarVisible(false)
            }
          }})
        })

      // 观察每个卡片
      observer.observe(topRefs)
      observer.observe(carRefs)

      onCleanup(() => {
        observer.disconnect()
        // carObserver.disconnect()
      })
    }
  })

  return (
    <div class="bg-no-repeat bg-cover w-full relative bg-[url('/img/WorlMap.png')] bgPositionChange -mt-25">
      <div class="mx-auto relative container max-w-7xl min-h-screen">
        <div id="topRefs" class="grid gap-4 px-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" ref={topRefs}>
          <For each={data()}>
            {(item, index) => (
              <div class={`bg-center bg-no-repeat bg-cover ${item.bgUrl} ${isTopVisible() ? `animate__animated animate__fadeInUp` : ''}`} style={{ 'animation-delay': `${index() * 0.1}s` }}>
                <div class="flex items-center transition-colors duration-300 h-full bg-[#121c45] p-[62px_30px] hover:bg-[#ff3f39cc]">
                  <img class="max-w-full w-[60px] h-[59px] mr-[20px]" alt={item.title} src={item.imageUrl} />
                  <h4 class="text-white font-bold text-3xl" innerHTML={item.title} />
                </div>
              </div>
            )}
          </For>
        </div>

        <div class="container mx-auto flex md:flex-row flex-col items-center mt-32">
          <div class="w-full mb-10 md:mb-0 text-center md:text-left md:w-1/3">
            <h1 class="text-4xl font-bold">{t('bossTalk.heading')}</h1>
          </div>
          <div class="flex flex-col md:text-left items-center text-center px-4 md:w-2/3 md:items-start">
            <h5 class="text-stone-400" innerHTML={t('bossTalk.description')} />
            <div class="flex items-center justify-between w-full">
              <div class="text-stone-400 pt-8">
                <p class="font-bold text-xs">{t('bossTalk.signature.name')}</p>
              </div>
              <div class="ml-auto">
                <img src="/img/Boss_Signature.png" class="w-auto" alt="Boss signature" />
              </div>
            </div>
          </div>
        </div>

        <div id="carRefs" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mt-32" ref={carRefs}>
          <For each={cards()}>
            {(card, index) => (
              <div
                style={{ 'animation-delay': `${index() * 0.1}s` }}
                class={`bg-repeat bg-auto transition-all duration-300 bg-white p-[50px_30px] shadow-[7px_7px_50px_#0000001a] 
                        ${isCarVisible() ? 'animate__animated animate__fadeInUp' : ''}
                        ${index() === 0 ? 'drone' : ''} 
                        ${index() === 1 ? 'tracking' : ''} 
                        ${index() === 2 ? 'fast' : ''}`}
              >
                <img src={card.img} class="w-14 h-14" alt={card.title} />
                <h3 class="font-bold my-4" innerHTML={card.title} />
                <p class="text-stone-400 text-size-sm">{card.description}</p>
                <div class="flex justify-between">
                  <a
                    href="#"
                    class="text-xs no-underline transition-colors duration-300 flex items-center text-[#ff3f39] pt-6 font-[400]"
                  >
                    {card.learnMore}
                  </a>
                  <span class="pt-6 pl-4">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                      <path
                        d="M481.834667 737.834667l60.330666 60.330666L828.330667 512l-286.165334-286.165333-60.330666 60.330666L665.002667 469.333333H256v85.333334h409.002667z"
                        fill="#ff3f39"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            )}
          </For>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-32 mt-24">
          <div class="text-center sm:text-right">
            <p class="text-stone-400">{t('sectionIntro.heading')}</p>
          </div>
          <div class="flex justify-center gap-10">
            <p class="text-[#ff3f39] text-sm cursor-pointer">{t('sectionIntro.subtitle')}</p>
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path
                d="M481.834667 737.834667l60.330666 60.330666L828.330667 512l-286.165334-286.165333-60.330666 60.330666L665.002667 469.333333H256v85.333334h409.002667z"
                fill="#ff3f39"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
