import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { createTheme, NextUIProvider } from "@nextui-org/react"
import useDarkMode from "use-dark-mode"

export default function App({

  Component,
  pageProps: { session, ...pageProps }
}) {

  const darkMode = useDarkMode(false);

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
    <SessionProvider session={session}>

      <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  )
}
