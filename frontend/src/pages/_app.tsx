import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
/* eslint-disable-next-line */
import 'windi.css' // windi.cssを使えるようにする

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Mantineを使えるようにする
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={
        {
          /** Put your mantine theme override here */
          // colorScheme: 'light',
        }
      }
    >
      <Component {...pageProps} />
    </MantineProvider>
  )
}

export default MyApp
