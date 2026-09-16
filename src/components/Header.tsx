import { Link } from '@tanstack/react-router'
import { BookOpen, ChevronDown, ArrowRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';
import AnimatedLink from './AnimatedLink';
import AnimatedContainer from './AnimatedContainer';

export function Header() {
  const [isOpen, SetIsOpen] = useState(false)

  return (
    <AnimatedContainer
      type='load'
      containerType='header'
      delay={0.3}
      direction='down'
      className="sticky top-0 z-50 w-full border-b border-default bg-background/80 backdrop-blur-md">
      {/*Desktop Navigation*/}
      <div className="page-wrap flex h-16 items-center justify-between">
        <div className='flex items-center gap-14'>
            {/* LEFT: Logo and Nav links*/}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-hover">
              <BookOpen className="h-4 w-4 text-background" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-text-primary">OmniBook</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-text-muted transition-colors hover:text-text-primary
              data-[status=active]:text-text-primary"
            >
              Features
            </a>
            <button className="flex items-center gap-1 cursor-pointer text-sm font-medium text-text-muted transition-colors hover:text-text-primary
            data-[status=active]:text-text-primary"
            onClick={()=>SetIsOpen(!isOpen)}>
              Resources
              <ChevronDown className={`h-3.5 w-3.5 transition-rotate duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <Link
              to="/"
              className="text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
            >
              Pricing
            </Link>
          </nav>
        </div>

        {/* RIGHT: Actions and Toggle Icon */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="hidden text-sm font-medium text-text-muted transition-colors hover:text-text-primary md:block"
          >
            Log in
          </Link>
          <AnimatedLink
            route="/"
            classes="flex items-center gap-1.5 rounded-lg bg-accent-primary px-4 py-2 text-sm 
                     font-semibold text-white transition-colors hover:bg-accent-hover shadow-lg shadow-shadow-glow"
          >
            Get Started
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </AnimatedLink>
          <ThemeToggle />
        </div>
      </div>
    </AnimatedContainer>
  )
}

export default Header;