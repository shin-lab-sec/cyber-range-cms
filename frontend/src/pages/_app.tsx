import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
/* eslint-disable-next-line */
import 'windi.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        /** Put your mantine theme override here */
        // colorScheme: 'light',
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  )
}

export default MyApp
