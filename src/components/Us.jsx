import { createMemo, For, createSignal } from 'solid-js'
import { useI18n } from '~/i18n/usei18n.hook' // Make sure to import the useI18n hook

export default function ChooseUs() {
    
    const [t] = useI18n()
    // 切换语言的函数
    const features = createMemo(() => t('chooseUs.features'))
    const data = createMemo(() => t('question.contents'))

    const [openIndex, setOpenIndex] = createSignal(null);

    const toggleFAQ = (index) => {
      setOpenIndex((prev) => (prev === index ? null : index));
    };

    return(
        <div class="bg-no-repeat bg-cover w-full relative bg-[url('/img/WorlMap.png')]">
            <div class="mb-30 pt-40">
                <div class="max-w-7xl flex flex-col px-4 mx-auto md:flex-row">
                    <div class="w-full lg:w-[45%] pr-5 pb-10">
                    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">{t('chooseUs.title')}<br /></h1>
                    <p class="text-sm text-stone-400 mt-10">{t('chooseUs.description')}</p>
                    </div>
                    <div class="flex flex-wrap w-full lg:w-[55%]">
                    {features().map((feature) => (
                        <div class="w-1/2 px-4 flex" key={feature.title}>
                        <img src={feature.img} loading="lazy" alt={feature.alt} class="object-contain h-[60px] w-[60px]" />
                        <div class="pl-5">
                            <h5 class="font-bold">{feature.title}</h5>
                            <p class="text-sm text-stone-400">{feature.text}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            <div class="mx-auto max-w-7xl px-4 pb-40">
                <div class="mt-20 flex flex-col gap-12 md:mt-32 lg:flex-row">
                    <div class="text-center lg:w-5/12 lg:text-left">
                        <h2 class="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl lg:text-4xl">{t('question.heading')}</h2>
                        <p class="mt-4 text-gray-600 dark:text-gray-300">{t('question.subtitle')}</p>
                    </div>
                    <div class="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800 lg:w-7/12">
                    <For each={data()}>
  {(item, index) => {
    let contentRef; // 引用每个动态生成的内容区域

    return (
      <dl class="faq mx-auto max-w-2xl">
        <dt class="text-lg sm:mb-0">
          <button
            type="button"
            class="flex w-full items-start justify-between py-6 text-left text-gray-400"
            onClick={() => toggleFAQ(index())}
          >
            <span class="text-lg font-normal text-gray-900 dark:text-white">
              {item.question}
            </span>
            <span class="ml-6 flex h-7 items-center">
              <svg
                class={`h-6 w-6 rotate-0 transform duration-300 ${
                  openIndex() === index() ? "rotate-180" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                ></path>
              </svg>
            </span>
          </button>
        </dt>
        <dd
          ref={contentRef} // 获取每个内容区域的引用
          class="block overflow-hidden pr-12 duration-300 ease-in-out"
          style={{
            height: openIndex() === index()
              ? `${contentRef?.scrollHeight}px`
              : "0px",
          }}
        >
          <p class="pb-6 text-base text-gray-600 dark:text-gray-400">
            {item.answer}
          </p>
        </dd>
      </dl>
    );
  }}
</For>
                    </div>
                </div>  
            </div>
        </div>
    )
}