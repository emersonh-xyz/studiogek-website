import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SSRProvider } from '@react-aria/ssr';

export default function App({

  Component,
  pageProps: { session, ...pageProps }
}) {


  // 2. Call `createTheme` and pass your custom values
  const lightTheme = createTheme({
    type: 'light',
    theme: {
      colors: {}, // optional
    }
  })

  const darkTheme = createTheme({
    type: 'dark',
    theme: {
      colors: {}, // optional
    }
  })


  return (

    <SSRProvider>
      <SessionProvider session={session}>
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          value={{
            light: lightTheme.className,
            dark: darkTheme.className
          }}
        >
          <NextUIProvider >
            <Component {...pageProps} />
          </NextUIProvider>
        </NextThemesProvider>
      </SessionProvider>
    </SSRProvider>
  )
}
