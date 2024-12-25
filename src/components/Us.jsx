import { createMemo, For } from 'solid-js'
import { useI18n } from '~/i18n/usei18n.hook' // Make sure to import the useI18n hook

export default function ChooseUs() {
    const [t] = useI18n()
    // 切换语言的函数
    const features = createMemo(() => t('chooseUs.features'))

    return(
        <div class="bg-no-repeat bg-cover w-full relative bg-[url('/img/WorlMap.png')]">
            <div class="mb-30 pt-30 px-4">
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
        </div>

        


    )
}