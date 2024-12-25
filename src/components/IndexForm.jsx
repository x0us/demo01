import { createForm, getValue } from '@modular-forms/solid'
import { createSignal, For, onMount } from 'solid-js'
import { useI18n } from '~/i18n/usei18n.hook'
import { useToast } from './ToastNotification'

export default function IndexForm() {
  const [activeTab, setActiveTab] = createSignal(0)
  const { showToast } = useToast()
  let circle1, circle2, circle3

  const [quotationForm, { Form: QuotationForm, Field: QuotationField }] = createForm({
    initialValues: {
      name: '',
      phone: '',
      departureCountry: '',
      departureCity: '',
      destinationCountry: '',
      destinationCity: '',
      comments: '',
    },
  })

  const [queryForm, { Form: QueryForm, Field: QueryField }] = createForm({
    initialValues: {
      comments: '',
    },
  })

  const animateProgress = (element, index) => {
    const circle = element.querySelector('.progress-circle')
    const percentageSpan = element.querySelector('.percentage-text span')
    const duration = 1500
    const circleCircumference = 2 * Math.PI * 15

    // 根据索引设置不同的目标百分比
    const finalPercentages = [99, 97, 95]
    const finalPercentage = finalPercentages[index]

    const startTime = performance.now()
    const easeInOut = t => t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeInOut(progress)

      const currentPercentage = Math.round(easedProgress * finalPercentage)
      percentageSpan.textContent = currentPercentage

      const dashLength = (circleCircumference * currentPercentage / 100)
      circle.style.strokeDasharray = `${dashLength}, ${circleCircumference - dashLength}`

      if (progress < 1)
        requestAnimationFrame(updateProgress)
    }

    requestAnimationFrame(updateProgress)
  }

  onMount(() => {
    // 使用数组批量处理动画
    [circle1, circle2, circle3].forEach((circle, index) => {
      animateProgress(circle, index)
    })
  })

  const [t] = useI18n()

  const handleTabChange = tabIndex => setActiveTab(tabIndex)

  const renderSelect = type => (
    <>
      <QuotationField name={`${type}Country`}>
        {(field, props) => (
          <select
            {...props}
            class="w-full text-sm mb-6 text-[#333] px-3 py-2 font-normal block border border-[#0000001a] h-[45px] mr-6"
          >
            <option value="" />
            <For each={t('locations')}>
              {location => (
                <optgroup label={location.continent}>
                  <For each={location.countries}>
                    {country => (
                      <option value={country.name} disabled={country.name === getValue(quotationForm, `${type === 'departure' ? 'destination' : 'departure'}Country`)}>
                        {country.name}
                      </option>
                    )}
                  </For>
                </optgroup>
              )}
            </For>
          </select>
        )}
      </QuotationField>
      <QuotationField name={`${type}City`}>
        {(field, props) => (
          <select
            {...props}
            classList={{ 'mr-6': type === 'departure' }}
            class="text-[#333] px-3 py-2 font-normal text-sm block border border-[#0000001a] w-full h-[45px] mb-6"
          >
            <option value="" />
            <For each={t('locations')
              .flatMap(location => location.countries)
              .find(country => country.name === getValue(quotationForm, `${type}Country`))
              ?.cities}
            >
              {city => (
                <option value={city} disabled={city === getValue(quotationForm, `${type === 'departure' ? 'destination' : 'departure'}City`)}>
                  {city}
                </option>
              )}
            </For>
          </select>
        )}
      </QuotationField>
    </>
  )

  const renderFormContent = () => {
    if (activeTab() === 0) {
      return (
        <QuotationForm onSubmit={(data) => { showToast('Custom message', 5000) }}>
          <h6 class="mb-5">{t('form.quotation.labeltop')}</h6>
          <div class="flex">
            <For each={['name', 'phone']}>
              {item => (
                <QuotationField name={item}>
                  {(field, props) => (
                    <input
                      {...props}
                      classList={{ 'mr-6': item === 'name' }}
                      class="text-[#333] px-3 py-2 font-normal text-sm block border border-[#0000001a] w-full h-[45px] mb-6"
                      maxlength="256"
                      type={item === 'phone' ? 'tel' : 'text'}
                      required
                      placeholder={t(`form.quotation.${item}`)}
                    />
                  )}
                </QuotationField>
              )}
            </For>
          </div>
          <div class="flex justify-between">
            <h6 class="mb-5">{t('form.quotation.departure')}</h6>
            <h6 class="mb-5">{t('form.quotation.destination')}</h6>
          </div>
          <div class="flex">
            {['departure', 'destination'].map(renderSelect)}
          </div>
          <QuotationField name="comments">
            {(field, props) => (
              <textarea
                {...props}
                placeholder={t('form.quotation.comments')}
                maxlength="300"
                class="text-[#333] px-3 py-2 font-normal text-sm block border border-[#0000001a] w-full mb-6 h-[100px]"
              />
            )}
          </QuotationField>
          <input
            type="submit"
            value={t('form.quotation.submit')}
            class="text-white w-full cursor-pointer px-8 py-5 bg-[#ff3f39e6] hover:bg-[#001d67] duration-300"
          />
        </QuotationForm>
      )
    }
    else {
      return (
        <QueryForm onSubmit={data => console.log('Query Form Submitted', data)}>
          <h6 class="mb-5">{t('form.query.label')}</h6>
          <QueryField name="comments">
            {fieldProps => (
              <textarea
                {...fieldProps}
                placeholder={t('form.query.description')}
                maxlength="500"
                class="text-[#333] px-3 py-2 font-normal text-sm block border border-[#0000001a] w-full mb-6 h-[200px]"
              />
            )}
          </QueryField>
          <input
            type="submit"
            value={t('form.query.submit')}
            class="text-white cursor-pointer px-8 py-5 bg-[#ff3f39e6] w-full hover:bg-[#001d67] duration-300"
          />
        </QueryForm>
      )
    }
  }

  return (
    <div id="services" class="bg-center bg-no-repeat bg-cover bg-[url('img/shelves.jpeg')] bg-fixed mt-50">
      <div class="bg-[#121c45e6]">
        <div class="relative mx-auto px-4 max-w-[1140px] -top-30">
          <div class="bg-[#001d67]">
            {['quotation', 'query'].map((tab, index) => (
              <a
                class={`text-white bg-transparent align-top text-left cursor-pointer px-4 py-0 no-underline inline-block relative lg:px-30 ${activeTab() === index ? 'border-b-4 border-[#ff3f39] text-[#ff3f39]' : ''}`}
                onClick={() => handleTabChange(index)}
              >
                <div class="py-6 text-base">{t(`form.${tab}.tab`)}</div>
              </a>
            ))}
          </div>

          <div class="block relative overflow-hidden">
            <div class="flex flex-col lg:flex-row">
              <div class="w-full bg-white lg:w-[70%] p-10">{renderFormContent()}</div>
              <div class="bg-center bg-no-repeat bg-cover w-full mx-auto bg-[url('img/port.jpeg')] max-w-xl lg:w-[30%] mt-10 lg:mt-0">
                <div class="bg-[#ff3f39e6] flex flex-col w-full p-10 items-stretch h-full">
                  <h2 class="text-white text-center font-bold mb-10">{t(`form.${activeTab() === 0 ? 'quotation' : 'query'}.sidetitle`)}</h2>
                  <p class="text-white text-base">{t(`form.${activeTab() === 0 ? 'quotation' : 'query'}.sidedescription`)}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="max-w-[1140px] mx-auto px-4 pb-50">
          <div class="flex flex-col lg:flex-row items-center justify-between">
            <div>
              <h1 class="text-white font-bold text-4xl text-center md:text-left" innerHTML={t('chart.title')} />
            </div>
            <div class="flex justify-between">
              <div class="relative max-w-60">
                <div class="relative m-5" ref={circle1}>
                  <div class="flex justify-center items-center circle-progress">
                    <svg viewBox="0 0 33 33" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle fill="none" cx="16" cy="16" r="15" />
                      <circle class="progress-circle" stroke="#ff3f39" stroke-dasharray="0, 94.2" fill="none" cx="16" cy="16" r="15" />
                    </svg>
                  </div>
                  <div class="flex flex-col justify-center items-center w-full absolute max-w-[300px] inset-0">
                    <div class="text-sm text-white font-bold md:text-4xl percentage-text">
                      <span>0</span>
                      <span>%</span>
                    </div>
                  </div>
                </div>
                <h5 class="text-white font-bold text-center text-xl">{t('chart.one')}</h5>
              </div>
              <div class="max-w-60 relative">
                <div class="relative m-5" ref={circle2}>
                  <div class="flex justify-center items-center circle-progress">
                    <svg viewBox="0 0 33 33" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle fill="none" cx="16" cy="16" r="15" />
                      <circle class="progress-circle" stroke="#ff3f39" stroke-dasharray="0, 94.2" fill="none" cx="16" cy="16" r="15" />
                    </svg>
                  </div>
                  <div class="flex flex-col justify-center items-center w-full max-w-[300px] absolute inset-0">
                    <div class="text-sm text-white md:text-4xl font-bold percentage-text">
                      <span>0</span>
                      <span>%</span>
                    </div>
                  </div>
                </div>
                <h5 class="text-white text-xl font-bold text-center">{t('chart.two')}</h5>
              </div>
              <div class="max-w-60 relative">
                <div class="relative m-5" ref={circle3}>
                  <div class="flex justify-center items-center circle-progress">
                    <svg viewBox="0 0 33 33" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle fill="none" cx="16" cy="16" r="15" />
                      <circle class="progress-circle" stroke="#ff3f39" stroke-dasharray="0, 94.2" fill="none" cx="16" cy="16" r="15" />
                    </svg>
                  </div>
                  <div class="flex flex-col justify-center items-center w-full max-w-[300px] absolute inset-0">
                    <div class="text-sm text-white md:text-4xl font-bold percentage-text">
                      <span>0</span>
                      <span>%</span>
                    </div>
                  </div>
                </div>
                <h5 class="text-white text-xl font-bold text-center">{t('chart.three')}</h5>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
