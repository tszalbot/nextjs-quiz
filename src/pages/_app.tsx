import type { AppProps } from 'next/app'

// SCSS
import '../styles/globals.scss'
// import 'bootstrap/scss/bootstrap.scss'

// FontAwesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
