import { MetaProvider, Link } from "@solidjs/meta";
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import Footer from '~/components/Footer'


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
          <MetaProvider>
            <Link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
            <Suspense>{props.children}</Suspense>
            <Footer />
          </MetaProvider>
        )}
      >
        <FileRoutes />
      </Router>
    </RootProvider>
  )
}
