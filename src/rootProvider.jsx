import { ToastProvider } from '~/components/ToastNotification'
import { localeDict } from '~/i18n/locales'
import { createI18nContext, I18nContext } from '~/i18n/usei18n.hook'
import { LenisProvider } from '~/lib/lenis'
import {
  AppStoreContext,
  createAppStoreContext,
} from '~/store/useAppStore'

// #region PROVIDERS
export function AppStoreProvider(props) {
  const value = createAppStoreContext(props.store)

  return (
    <AppStoreContext.Provider value={value}>
      {props.children}
    </AppStoreContext.Provider>
  )
}

export function I18nProvider(props) {
  const value = createI18nContext(props.dict, props.locale)

  return (
    <I18nContext.Provider value={value}>{props.children}</I18nContext.Provider>
  )
}

export function RootProvider(props) {
  return (
    <AppStoreProvider>
      <LenisProvider>
        <ToastProvider>
          <I18nProvider dict={localeDict}>{props.children}</I18nProvider>
        </ToastProvider>
      </LenisProvider>
    </AppStoreProvider>
  )
}
// #endregion
