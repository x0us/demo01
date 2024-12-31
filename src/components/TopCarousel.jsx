import { For, onMount } from 'solid-js'
import { useI18n } from '~/i18n/usei18n.hook' // Import the useI18n hook
import { getFlickity } from '~/services/flickityService'

export default function TopCarousel() {
  const [t] = useI18n()
  let carouselRef

  // Initialize Flickity carousel on mount
  onMount(async () => {
    const Flickity = await getFlickity() // Use the shared service
    new Flickity(carouselRef, {
      setGallerySize: false,
      cellAlign: 'center',
      contain: true,
      autoPlay: 4000,
      wrapAround: false,
      selectedAttraction: 0.01,
      friction: 0.15,
      fade: true,
      pageDots: false,
      prevNextButtons: false,
    })
  })
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  return (
    <div id="home" class="w-full relative">
      {/* Carousel Section */}
      <div class="absolute inset-0 flex">
        <div ref={carouselRef} class="carousel">
          <For each={['img/s1.jpg', 'img/s2.jpg', 'img/s3.jpg']}>
            {src => (
              <div class="h-full carousel-cell">
                <img src={src} class="object-cover brightness-[0.5] contrast-[0.9]" alt="carousel item" />
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Overlay Content */}
      <div class="relative inset-0 bg-[#0000001a]">
        <div class="flex items-center w-full max-w-[1140px] mx-auto min-h-[900px] px-[15px]">
          <div class="w-full max-w-[625px]">
            <h1 class="text-white mb-10 text-7xl leading-[1.2]">
              {t('hero.heading')}
            </h1>
            <p class="text-base text-white mb-2 leading-[1.7]">
              {t('hero.description')}
            </p>
            <div class="mt-10">
              <For each={[
                { text: t('hero.buttons.ourServices'), classes: 'bg-red-600 hover:bg-red-500 text-red-100', id:'services' },
                { text: t('hero.buttons.aboutUs'), classes: 'bg-white hover:bg-red-600 hover:text-white text-stone-9 ml-4', id:'contact' },
              ]}
              >
                {({ text, classes, id }) => (
                  <button class={`px-8 py-5 no-underline transition duration-300 ${classes}`} onClick={() => scrollToSection(id)}>
                    {text}
                  </button>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
