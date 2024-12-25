import { createEffect, createMemo, onCleanup } from 'solid-js'
import { useI18n } from '~/i18n/usei18n.hook' // Import the useI18n hook
import { getFlickity } from '~/services/flickityService'

export default function Testimonal() {
  const [t] = useI18n()
  let carouselRef
  let flickityInstance // 存储 Flickity 实例

  const testimonials = createMemo(() => t('comments'))

  // 监听 testimonials 变化并重新初始化 carousel
  createEffect(async () => {
    // 确保 testimonials 数据已加载
    testimonials()

    // 如果已存在实例，先销毁它
    if (flickityInstance) {
      flickityInstance.destroy()
    }

    // 重新初始化 Flickity
    const Flickity = await getFlickity()
    flickityInstance = new Flickity(carouselRef, {
      cellAlign: 'left',
      contain: true,
      autoPlay: 4000,
      wrapAround: true,
      selectedAttraction: 0.01,
      friction: 0.15,
      pageDots: false,
      prevNextButtons: false,
      percentPosition: false,
    })
  })

  // 组件卸载时清理
  onCleanup(() => {
    if (flickityInstance) {
      flickityInstance.destroy()
    }
  })

  const StarIcon = props => (
    <svg
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
    >
      <path
        d="M956 398.496q-8-23.488-26.496-39.008t-42.496-19.488l-204.992-31.008-92-195.008q-11.008-24-32.992-36.992Q536.032 64 512.032 64t-44.992 12.992q-22.016 12.992-32.992 36.992l-92 195.008-204.992 31.008q-24 4-42.496 19.488t-26.496 39.008-2.496 47.008 22.496 41.504l151.008 154.016-36 218.016q-6.016 40 20 70.496t66.016 30.496q22.016 0 42.016-11.008l180.992-100 180.992 100q20 11.008 42.016 11.008 40 0 66.016-30.496t20-70.496l-36-218.016 151.008-154.016q16.992-18.016 22.496-41.504t-2.496-47.008z"
        fill={props.filled ? '#ff3f39' : '#8a8a8a'}
      />
    </svg>
  )

  const TestimonialCard = props => (
    <div class="mr-4 w-full testimonial-cell md:w-[40%] md:mr-10">
      <div class="bg-white flex flex-col items-stretch p-8 relative justify-start shadow-[7px_7px_50px_#0000001a]">
        <div class="flex justify-center color-customer-red">
          {[...Array.from({ length: 5 })].map((_, i) => (
            <StarIcon filled={i < (Math.random() < 0.5 ? 4 : 5)} />
          ))}
        </div>
        <h4>
          {props.testimonial.comment}
        </h4>
      </div>
      <div class="flex mt-5">
        <div
          class="bg-center bg-cover rounded-full w-[40px] h-[40px] mr-[30px]"
          style={`background-image: url('img/avatar${String(props.index % 5 + 1).padStart(2, '0')}.jpg')`}
        />
        <div class="text-left">
          <h5>{props.testimonial.name}</h5>
          <h6>{props.testimonial.position}</h6>
        </div>
      </div>
    </div>
  )

  return (
    <div class="mt-5 relative h-75">
      <div class="bg-transparent h-auto overflow-hidden relative bg-transparent text-center -top-[100px]">
        <div ref={carouselRef} class="w-full testimonial">
          {testimonials().map((testimonial, index) => (
            <TestimonialCard testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
