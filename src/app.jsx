import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import Footer from '~/components/Footer'

import Nav from '~/components/Nav'
import { useLenis } from '~/lib/lenis'
import { RootProvider } from './rootProvider'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './app.css'
import 'flickity/css/flickity.css'
import 'flickity-fade/flickity-fade.css'

export default function App() {
  useLenis()
  return (
    <RootProvider>
      <Router base={import.meta.env.SERVER_BASE_URL}
        root={props => (
          <>
            <Nav />
            <Suspense>{props.children}</Suspense>
            <Footer />
          </>
        )}
      >
        <FileRoutes />
      </Router>
    </RootProvider>
  )
}
