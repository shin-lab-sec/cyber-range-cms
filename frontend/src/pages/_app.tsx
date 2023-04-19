import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import 'windi.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
