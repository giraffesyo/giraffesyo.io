import { FitAddon } from '@xterm/addon-fit'
import { Terminal as XTerm } from '@xterm/xterm'
import { useCallback, useEffect, useRef, useState } from 'react'
import '@xterm/xterm/css/xterm.css'

const PURPLE = '\x1b[38;2;178;103;230m'
const RESET = '\x1b[0m'
const _CYAN = '\x1b[36m'
const _WHITE = '\x1b[37m'
const _DIM = '\x1b[2m'

const COMMANDS: Record<string, string | ((args: string) => string)> = {
  whoami: 'michael.mcquade',
  'cat role.txt': 'Director of Engineering @ Parallel Works',
  'echo $STACK': 'go typescript kubernetes',
  ls: 'role.txt   stack.json   resume.pdf',
  'cat stack.json': [
    '{',
    '  "languages": ["go", "typescript", "python"],',
    '  "infra": ["kubernetes", "docker", "terraform"],',
    '  "cloud": ["aws", "gcp", "azure"]',
    '}',
  ].join('\r\n'),
  cat: 'usage: cat <file>',
  open: 'usage: open <file>',
  'cat resume.pdf': 'Error: binary file. Try: open resume.pdf',
  'open resume.pdf': () => {
    window.open('/resume.pdf', '_blank')
    return 'Opening resume.pdf...'
  },
  'open role.txt': 'Director of Engineering @ Parallel Works',
  'open stack.json': () => {
    return COMMANDS['cat stack.json'] as string
  },
  help: [
    'Available commands:',
    '  whoami       cat <file>    open <file>',
    '  neofetch     echo <text>   contact',
    '  ls           history       date',
    '  clear        help',
  ].join('\r\n'),
  contact: () => {
    window.open('mailto:michael@giraffesyo.io', '_blank')
    return 'Opening mail client...'
  },
  date: () => new Date().toLocaleString(),
  sudo: 'Permission denied. Nice try.',
  'sudo rm -rf /': 'Permission denied. Nice try.',
  vim: '*opens vim* ...just kidding, I use neovim btw',
  neovim: '*opens neovim* ...not really, this is a browser',
  exit: 'You can check out any time you like, but you can never leave.',
  pwd: '/home/michael',
  cd: "There's nowhere to go.",
  'cd ..': "There's nowhere to go.",
}

const FILES = ['role.txt', 'stack.json', 'resume.pdf']

const TAB_COMMANDS = [
  'whoami',
  'neofetch',
  'ls',
  'cat',
  'open',
  'echo',
  'contact',
  'history',
  'date',
  'clear',
  'help',
]

const INITIAL_SEQUENCE = [
  { cmd: 'whoami', out: 'michael.mcquade' },
  { cmd: 'cat role.txt', out: 'Director of Engineering @ Parallel Works' },
  { cmd: 'echo $STACK', out: 'go typescript kubernetes' },
]

export default function Terminal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<XTerm | null>(null)
  const fitRef = useRef<FitAddon | null>(null)
  const [windowState, setWindowState] = useState<'open' | 'minimized' | 'closed'>('open')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showNeofetch, setShowNeofetch] = useState(false)
  const showNeofetchRef = useRef(false)
  const stateRef = useRef({
    currentLine: '',
    history: [] as string[],
    historyIdx: -1,
    interactive: false,
  })

  const toggleFullscreen = useCallback(() => {
    if (!windowRef.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      windowRef.current.requestFullscreen()
    }
  }, [])

  useEffect(() => {
    const handler = () => {
      const fs = !!document.fullscreenElement
      setIsFullscreen(fs)
      if (!fs && termRef.current) {
        // Reset to default rows so it shrinks back
        termRef.current.resize(termRef.current.cols, 12)
      }
      setTimeout(() => {
        fitRef.current?.fit()
        termRef.current?.focus()
      }, 100)
    }
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  // ResizeObserver to re-fit xterm whenever the container size changes
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      fitRef.current?.fit()
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const prompt = useCallback(() => {
    termRef.current?.write(`\r\n${PURPLE}$${RESET} `)
  }, [])

  const runCommand = useCallback(
    (cmd: string) => {
      const term = termRef.current
      if (!term) return

      const trimmed = cmd.trim()
      if (!trimmed) {
        prompt()
        return
      }

      const state = stateRef.current
      state.history.push(trimmed)
      state.historyIdx = -1

      if (trimmed === 'clear') {
        term.write('\x1b[2J\x1b[H')
        term.clear()
        term.write(`${PURPLE}$${RESET} `)
        return
      }

      if (trimmed === 'neofetch') {
        showNeofetchRef.current = true
        setShowNeofetch(true)
        return
      }

      if (trimmed === 'history') {
        const output = state.history.map((h, i) => `  ${i + 1}  ${h}`).join('\r\n')
        term.write(`\r\n${output}`)
        prompt()
        return
      }

      // Handle echo with arguments
      if (trimmed.startsWith('echo ') && trimmed !== 'echo $STACK') {
        const arg = trimmed.slice(5).replace(/^["']|["']$/g, '')
        term.write(`\r\n${arg}`)
        prompt()
        return
      }

      const result = COMMANDS[trimmed] ?? COMMANDS[trimmed.split(' ')[0]]

      if (result) {
        const output = typeof result === 'function' ? result(trimmed) : result
        term.write(`\r\n${output}`)
      } else {
        term.write(`\r\ncommand not found: ${trimmed.split(' ')[0]}. Try 'help'`)
      }

      prompt()
    },
    [prompt],
  )

  const dismissNeofetch = useCallback(() => {
    if (!showNeofetchRef.current) return
    showNeofetchRef.current = false
    setShowNeofetch(false)
    const term = termRef.current
    if (term) {
      term.write('\r\n') // blank line after neofetch
      prompt()
      term.focus()
    }
  }, [prompt])

  useEffect(() => {
    if (!containerRef.current) return

    const isDark = document.documentElement.classList.contains('dark')

    const term = new XTerm({
      cursorBlink: true,
      cursorStyle: 'block',
      fontSize: 13,
      fontFamily: "'JetBrains Mono', monospace",
      lineHeight: 1.5,
      theme: {
        background: isDark ? '#09090b' : '#ffffff',
        foreground: isDark ? '#a1a1aa' : '#57534e',
        cursor: '#b267e6',
        selectionBackground: '#b267e633',
      },
      rows: 12,
      scrollback: 100,
    })

    const fit = new FitAddon()
    term.loadAddon(fit)
    term.open(containerRef.current)
    fit.fit()

    termRef.current = term
    fitRef.current = fit

    // Handle input
    term.onData((data) => {
      const state = stateRef.current
      if (!state.interactive) return

      // If neofetch is showing, dismiss on any key
      if (showNeofetchRef.current) {
        dismissNeofetch()
        return
      }

      const code = data.charCodeAt(0)

      if (data === '\t') {
        // Tab completion
        const line = state.currentLine
        const parts = line.split(' ')

        let completions: string[] = []

        if (parts.length <= 1) {
          // Complete command name
          completions = TAB_COMMANDS.filter((c) => c.startsWith(line))
        } else {
          // Complete file argument
          const prefix = parts.slice(1).join(' ')
          completions = FILES.filter((f) => f.startsWith(prefix))
        }

        if (completions.length === 1) {
          const match = completions[0]
          let completion: string

          if (parts.length <= 1) {
            completion = match.slice(line.length)
            // Add space after command
            completion += ' '
          } else {
            const prefix = parts.slice(1).join(' ')
            completion = match.slice(prefix.length)
          }

          state.currentLine += completion
          term.write(completion)
        } else if (completions.length > 1) {
          // Show options
          term.write(`\r\n${completions.join('  ')}`)
          term.write(`\r\n${PURPLE}$${RESET} ${state.currentLine}`)
        }
        return
      }

      if (data === '\r') {
        runCommand(state.currentLine)
        state.currentLine = ''
      } else if (code === 127) {
        if (state.currentLine.length > 0) {
          state.currentLine = state.currentLine.slice(0, -1)
          term.write('\b \b')
        }
      } else if (data === '\x1b[A') {
        if (state.history.length === 0) return
        if (state.historyIdx === -1) {
          state.historyIdx = state.history.length - 1
        } else if (state.historyIdx > 0) {
          state.historyIdx--
        }
        const clearLen = state.currentLine.length
        term.write('\b \b'.repeat(clearLen))
        state.currentLine = state.history[state.historyIdx]
        term.write(state.currentLine)
      } else if (data === '\x1b[B') {
        if (state.historyIdx === -1) return
        const clearLen = state.currentLine.length
        term.write('\b \b'.repeat(clearLen))
        state.historyIdx++
        if (state.historyIdx >= state.history.length) {
          state.historyIdx = -1
          state.currentLine = ''
        } else {
          state.currentLine = state.history[state.historyIdx]
        }
        term.write(state.currentLine)
      } else if (data === '\x03') {
        state.currentLine = ''
        term.write('^C')
        prompt()
      } else if (data === '\x0c') {
        // Ctrl+L
        term.write('\x1b[2J\x1b[H')
        term.clear()
        term.write(`${PURPLE}$${RESET} `)
        state.currentLine = ''
      } else if (code >= 32) {
        state.currentLine += data
        term.write(data)
      }
    })

    // Auto-play initial sequence
    let cancelled = false

    async function sleep(ms: number) {
      return new Promise((r) => setTimeout(r, ms))
    }

    async function autoPlay() {
      await sleep(600)

      for (const { cmd, out } of INITIAL_SEQUENCE) {
        if (cancelled) return

        term.write(`${PURPLE}$${RESET} `)

        for (const char of cmd) {
          if (cancelled) return
          term.write(char)
          await sleep(30 + Math.random() * 30)
        }

        await sleep(200)
        term.write(`\r\n${out}`)
        stateRef.current.history.push(cmd)

        await sleep(400)
        term.write('\r\n')
      }

      if (!cancelled) {
        stateRef.current.interactive = true
        prompt()
        term.focus()
      }
    }

    autoPlay()

    const handleResize = () => fit.fit()
    window.addEventListener('resize', handleResize)

    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains('dark')
      term.options.theme = {
        background: dark ? '#09090b' : '#ffffff',
        foreground: dark ? '#a1a1aa' : '#57534e',
        cursor: '#b267e6',
        selectionBackground: '#b267e633',
      }
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      cancelled = true
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      term.dispose()
    }
  }, [prompt, runCommand, dismissNeofetch])

  useEffect(() => {
    if (windowState === 'open' && fitRef.current && termRef.current) {
      const t = setTimeout(() => {
        fitRef.current?.fit()
        termRef.current?.refresh(0, termRef.current.rows - 1)
      }, 50)
      return () => clearTimeout(t)
    }
  }, [windowState])

  const terminalWindow = (
    <div
      ref={windowRef}
      className={`rounded-xl overflow-hidden relative w-full ${
        isFullscreen
          ? 'flex flex-col !rounded-none !h-screen !w-screen'
          : 'border border-stone-200 dark:border-zinc-800 shadow-2xl shadow-stone-200/50 dark:shadow-black/30'
      }`}
      style={{
        display: windowState === 'closed' ? 'none' : undefined,
      }}
    >
      {/* Title bar */}
      <div
        className='flex items-center gap-2 px-4 py-3 border-b border-stone-100 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-900'
        onDoubleClick={() => setWindowState((s) => (s === 'minimized' ? 'open' : 'minimized'))}
      >
        <div className='flex gap-1.5'>
          <button
            type='button'
            className='w-3 h-3 rounded-full bg-red-400/80 hover:bg-red-500 transition-colors cursor-pointer'
            onClick={(e) => {
              e.stopPropagation()
              setWindowState('closed')
            }}
            aria-label='Close terminal'
          />
          <button
            type='button'
            className='w-3 h-3 rounded-full bg-yellow-400/80 hover:bg-yellow-500 transition-colors cursor-pointer'
            onClick={() => setWindowState((s) => (s === 'minimized' ? 'open' : 'minimized'))}
            aria-label='Minimize terminal'
          />
          <button
            type='button'
            className='w-3 h-3 rounded-full bg-green-400/80 hover:bg-green-500 transition-colors cursor-pointer'
            onClick={toggleFullscreen}
            aria-label='Fullscreen terminal'
          />
        </div>
        <span className='text-[11px] font-mono text-stone-400 dark:text-zinc-600 ml-2'>~</span>
      </div>

      {/* Terminal */}
      <div
        ref={containerRef}
        className={`bg-white dark:bg-zinc-950 ${isFullscreen ? 'flex-1 px-2 pt-1 [&_.xterm]:h-full [&_.xterm-screen]:h-full' : 'px-2 pt-1'}`}
        style={{
          overflow: 'hidden',
          display: windowState === 'minimized' || windowState === 'closed' ? 'none' : undefined,
        }}
      />

      {/* Neofetch overlay */}
      {showNeofetch && (
        <div
          className='absolute inset-0 top-[44px] bg-white dark:bg-zinc-900/95 z-10 flex items-center justify-center cursor-pointer p-4'
          onClick={dismissNeofetch}
        >
          <div className='flex items-center gap-5 max-w-full'>
            <img
              src='/images/michaelmcquade.jpg'
              alt='Michael McQuade'
              className='w-24 h-24 rounded-lg object-cover shrink-0'
              style={{ objectPosition: '20% 20%' }}
            />
            <div className='font-mono text-xs leading-relaxed min-w-0'>
              <p>
                <span className='text-accent font-bold'>michael</span>
                <span className='text-stone-400 dark:text-zinc-600'>@</span>
                <span className='text-accent font-bold'>giraffesyo.io</span>
              </p>
              <p className='text-stone-300 dark:text-zinc-700'>──────────────────────</p>
              <p>
                <span className='text-accent'>Role</span>
                <span className='text-stone-400 dark:text-zinc-500'>: Director of Engineering</span>
              </p>
              <p>
                <span className='text-accent'>Company</span>
                <span className='text-stone-400 dark:text-zinc-500'>: Parallel Works</span>
              </p>
              <p>
                <span className='text-accent'>Stack</span>
                <span className='text-stone-400 dark:text-zinc-500'>
                  : Go, TypeScript, Kubernetes
                </span>
              </p>
              <p>
                <span className='text-accent'>Cloud</span>
                <span className='text-stone-400 dark:text-zinc-500'>: AWS, GCP, Azure</span>
              </p>
              <p>
                <span className='text-accent'>Location</span>
                <span className='text-stone-400 dark:text-zinc-500'>: Houston, TX</span>
              </p>
              <p>
                <span className='text-accent'>Education</span>
                <span className='text-stone-400 dark:text-zinc-500'>
                  : M.S. & B.S. Computer Science
                </span>
              </p>
              <p className='mt-2 text-stone-300 dark:text-zinc-700 italic'>
                press any key to continue
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className='w-full max-w-md'>
      {windowState === 'closed' && (
        <button
          type='button'
          onClick={() => setWindowState('open')}
          className='font-mono text-sm text-accent hover:text-accent-hover transition-colors px-4 py-2 rounded-lg border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 hover:border-accent/50 cursor-pointer'
        >
          ~ open terminal
        </button>
      )}
      {terminalWindow}
    </div>
  )
}
