import { SetStateAction, useCallback, useEffect, useState } from 'react'

const switchTheme = (theme) => {
  if (theme === 'dark') {
    localStorage.setItem('theme', 'light')
    document.querySelector('html').classList.remove('dark')
  } else {
    localStorage.setItem('theme', 'dark')
    document.querySelector('html').classList.add('dark')
  }
}

const getCurrentTheme = (): ThemeType => {
  if (typeof window === 'undefined') return

  const theme = localStorage.getItem('theme') as ThemeType
  if (theme) {
    return theme
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
}

type ThemeType = 'light' | 'dark'

const useDarkMode = (): [
  ThemeType,
  React.Dispatch<SetStateAction<ThemeType>>,
  () => void
] => {
  const [theme, setTheme] = useState<ThemeType>(getCurrentTheme())

  const toggleTheme = useCallback(() => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }, [theme])

  useEffect(() => {
    switchTheme(theme)
  }, [theme])
  return [theme, setTheme, toggleTheme]
}

export default useDarkMode
