import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

type ThemeMode = 'light' | 'dark'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  // Default to 'light' if no preference saved
  return 'light'
}

function applyThemeMode(mode: ThemeMode) {
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(mode)
  document.documentElement.setAttribute('data-theme', mode)
  document.documentElement.style.colorScheme = mode
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('light')

  useEffect(() => {
    const initialMode = getInitialMode()
    setMode(initialMode)
    applyThemeMode(initialMode)
  }, [])

  function toggleMode() {
    const nextMode: ThemeMode = mode === 'light' ? 'dark' : 'light'
    setMode(nextMode)
    applyThemeMode(nextMode)
    window.localStorage.setItem('theme', nextMode)
  }

  const label = `Theme mode: ${mode}. Click to switch.`

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={toggleMode}
      aria-label={label}
      className="text-sm text-text-muted hover:text-text-primary transition cursor-pointer bg-backdrop-blur rounded-full border bg-background w-7 h-7 p-2 flex justify-center items-center font-semibold shadow-[0_8px_22px_rgba(30,90,72,0.08)]"
    >
      {mode === 'dark' ?  <Sun size={18} className='shrink-0'/> : <Moon size={18} className='shrink-0'/>}
    </motion.button>
  )
}