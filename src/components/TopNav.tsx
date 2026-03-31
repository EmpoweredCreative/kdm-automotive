import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  COMPANY_LEGAL_NAME,
  PHONE_DISPLAY,
  PHONE_TEL_HREF,
  SITE_TAGLINE,
} from '../constants/site'

const linkClass =
  'font-headline font-semibold tracking-tight transition-colors duration-200'

export function TopNav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-outline-variant/15 bg-white/80 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-6 py-4 md:px-8">
        <Link to="/" className="group flex min-w-0 flex-col leading-none">
          <span className="font-headline text-lg font-bold tracking-tighter text-primary transition-colors group-hover:text-primary-container sm:text-xl md:text-2xl">
            {COMPANY_LEGAL_NAME}
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-secondary">
            {SITE_TAGLINE}
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex xl:gap-10">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              [
                linkClass,
                isActive
                  ? 'border-b-2 border-secondary pb-1 text-secondary'
                  : 'text-primary hover:text-secondary',
              ].join(' ')
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/plans"
            className={({ isActive }) =>
              [
                linkClass,
                isActive
                  ? 'border-b-2 border-secondary pb-1 text-secondary'
                  : 'text-primary hover:text-secondary',
              ].join(' ')
            }
          >
            Our Plans
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              [
                linkClass,
                isActive
                  ? 'border-b-2 border-secondary pb-1 text-secondary'
                  : 'text-primary hover:text-secondary',
              ].join(' ')
            }
          >
            Claims &amp; Contact
          </NavLink>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={PHONE_TEL_HREF}
            className="hidden items-center gap-1.5 rounded-full border border-outline-variant/35 bg-surface-container-low px-3 py-2 text-sm font-bold text-primary transition hover:border-primary/40 hover:bg-surface-container md:inline-flex"
          >
            <span className="material-symbols-outlined text-[22px] text-secondary" aria-hidden>
              call
            </span>
            <span className="hidden lg:inline">{PHONE_DISPLAY}</span>
            <span className="lg:hidden">Call</span>
          </a>
          <Link
            to="/contact"
            className="hidden rounded-full bg-secondary-container px-4 py-2.5 text-sm font-bold text-on-secondary-container shadow-md transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95 sm:inline-flex"
          >
            Get a Free Quote
          </Link>
          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-primary lg:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="material-symbols-outlined">
              {open ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-outline-variant/20 bg-white/95 px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            <a
              href={PHONE_TEL_HREF}
              className="inline-flex items-center gap-2 font-headline text-lg font-semibold text-primary"
              onClick={() => setOpen(false)}
            >
              <span className="material-symbols-outlined text-secondary">call</span>
              {PHONE_DISPLAY}
            </a>
            <NavLink
              to="/"
              end
              onClick={() => setOpen(false)}
              className="font-headline text-lg font-semibold text-primary"
            >
              Home
            </NavLink>
            <NavLink
              to="/plans"
              onClick={() => setOpen(false)}
              className="font-headline text-lg font-semibold text-primary"
            >
              Our Plans
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="font-headline text-lg font-semibold text-primary"
            >
              Claims &amp; Contact
            </NavLink>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="rounded-full bg-secondary-container px-5 py-3 text-center text-sm font-bold text-on-secondary-container"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  )
}
