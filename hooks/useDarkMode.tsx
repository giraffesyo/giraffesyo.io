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
  const [theme, setTheme] = useState<ThemeType>(
    typeof window === 'undefined' ? 'light' : getCurrentTheme()
  )

  const toggleTheme = useCallback(() => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }, [theme])

  // set initialTheme
  useEffect(() => {
    setTheme(
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    )
  }, [])
  // update local theme state when theme changes
  useEffect(() => {
    switchTheme(theme)
  }, [theme])
  return [theme, setTheme, toggleTheme]
}

export default useDarkMode
