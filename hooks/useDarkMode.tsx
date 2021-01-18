import { SetStateAction, useCallback, useEffect, useState } from 'react'

const switchTheme = (theme: ThemeType) => {
  // if (!window) return
  if (theme === 'light') {
    localStorage.setItem('theme', 'light')
    document.querySelector('html').classList.remove('dark')
  } else if (theme === 'dark') {
    localStorage.setItem('theme', 'dark')
    document.querySelector('html').classList.add('dark')
  }
}

const getCurrentTheme = (): ThemeType => {
  // if (typeof window === 'undefined') return
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light'
  const theme = localStorage.theme ?? systemPreference
  // console.log(
  //   `system pref: ${systemPreference}, local storage: ${localStorage.theme} get current theme returned `,
  //   theme
  // )
  return theme
}

type ThemeType = 'light' | 'dark'

const useDarkMode = (): [
  ThemeType,
  React.Dispatch<SetStateAction<ThemeType>>,
  () => void
] => {
  const [theme, setTheme] = useState<ThemeType>()

  const toggleTheme = useCallback(() => {
    // console.log('toggle theme called, theme was', theme)
    if (theme === 'dark') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('dark')
    }
  }, [theme])

  // set initialTheme
  useEffect(() => {
    setTheme(getCurrentTheme())
  }, [])
  // update local theme state when theme changes
  useEffect(() => {
    switchTheme(theme)
  }, [theme])
  return [theme, setTheme, toggleTheme]
}

export default useDarkMode
