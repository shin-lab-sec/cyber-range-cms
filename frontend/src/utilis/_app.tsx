import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import 'windi.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        breakpoints: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  )
}

export default MyApp
