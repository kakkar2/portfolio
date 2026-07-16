'use client'

import { IconMenu2, IconSearch, IconX } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ThemeToggle } from '@/components/layout/theme-toggle'
import { cn } from '@/lib/utils'

import { Kbd } from '../ui/kbd'
import { NavbarLogo } from './navbar-logo'

const NAV_LINKS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Components', href: '/components' },
  { label: 'Blog', href: '/blog' },
  { label: 'Resume', href: '/resume' },
] as const

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isMac = typeof window !== 'undefined' && navigator.platform.toLowerCase().includes('mac')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled && 'border-b border-border/60 bg-background/80 backdrop-blur-md'
      )}
    >
      <div className="container mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavbarLogo />

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden sm:block">
          <ul className="flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'rounded-md px-3 py-1.5 text-sm transition-colors',
                      isActive
                        ? 'font-medium text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => window.dispatchEvent(new Event('lalit:search-open'))}
            aria-label="Open search (Cmd+K)"
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <IconSearch size={17} aria-hidden="true" />
            <div className="flex items-center gap-1">
              <Kbd className="hidden sm:inline-flex">{isMac ? '⌘' : 'Ctrl'}</Kbd>
              <Kbd className="hidden sm:inline-flex">K</Kbd>
            </div>
          </button>

          {/* Separator */}
          <div className="mx-1 hidden h-4 w-px bg-border sm:block" aria-hidden="true" />

          <ThemeToggle />

          {/* Mobile menu trigger */}
          <button
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className={cn(
              'sm:hidden rounded-md p-2 text-muted-foreground',
              'transition-colors hover:bg-accent hover:text-foreground'
            )}
          >
            {isOpen ? (
              <IconX size={18} aria-hidden="true" />
            ) : (
              <IconMenu2 size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-border/60 bg-background/95 backdrop-blur-md sm:hidden"
          >
            <nav className="container mx-auto px-4 pb-4 pt-2">
              <ul className="flex flex-col" role="list">
                {NAV_LINKS.map(({ label, href }) => {
                  const isActive = pathname === href || pathname.startsWith(`${href}/`)
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'block rounded-md px-3 py-2.5 text-sm transition-colors',
                          isActive
                            ? 'font-medium text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
