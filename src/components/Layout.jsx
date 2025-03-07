'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { Hero } from '@/components/Hero'
import logo from '@/images/logo.svg'
import { MobileNavigation } from '@/components/MobileNavigation'
import { Navigation } from '@/components/Navigation'
import { ThemeSelector } from '@/components/ThemeSelector'

function Header() {
  let [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 sm:px-6 lg:px-8 dark:shadow-none',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur-sm dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent',
      )}
    >
      <div className="ml-6 flex lg:hidden">
        <MobileNavigation />
      </div>
      <div className="relative flex grow basis-0 items-center">
        <Link href="/" aria-label="Home page">
          <Image className="w-6" src={logo} alt="لوگو"></Image>
        </Link>
      </div>
      <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:grow">
        <ThemeSelector className="relative z-10" />
      </div>
    </header>
  )
}

export function Layout({ children }) {
  let pathname = usePathname()
  let isHomePage = pathname === '/'

  return (
    <div className="flex w-full flex-col">
      <Header />

      {isHomePage && <Hero />}

      <div className="relative mx-auto flex w-full max-w-[92rem] flex-auto justify-center sm:px-2">
        {!isHomePage && (
          <div className="hidden lg:relative lg:block lg:flex-none">
            <div className="absolute inset-y-0 left-0 w-[50vw] bg-slate-50 dark:hidden" />
            <div className="absolute top-16 bottom-0 left-0 hidden h-12 w-px bg-linear-to-t from-slate-800 dark:block" />
            <div className="absolute top-28 bottom-0 left-0 hidden w-px bg-slate-800 dark:block" />
            <div className="main-nav w- sticky top-[4.75rem] -mr-0.5 h-[calc(100vh-4.75rem)] overflow-x-hidden overflow-y-auto py-16 pr-0.5 pl-8 xl:w-64 xl:pl-8">
              <Navigation />
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
