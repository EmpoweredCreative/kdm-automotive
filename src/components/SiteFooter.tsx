import { Link } from 'react-router-dom'
import {
  COMPANY_LEGAL_NAME,
  PHONE_DISPLAY,
  PHONE_TEL_HREF,
} from '../constants/site'

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-white/10 bg-primary pt-16 pb-10 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 md:grid-cols-4">
        <div className="space-y-4">
          <span className="font-headline text-xl font-black tracking-tighter">
            {COMPANY_LEGAL_NAME}
          </span>
          <p className="max-w-xs text-sm leading-relaxed text-slate-300">
            Defining the future of vehicle protection through architectural
            reliability and concierge-level service.
          </p>
        </div>
        <div>
          <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#fcc419]">
            Protection Plans
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                className="inline-block text-slate-300 transition hover:translate-x-1 hover:text-white"
                to="/plans"
              >
                Powertrain
              </Link>
            </li>
            <li>
              <Link
                className="inline-block font-bold text-[#fcc419] transition hover:translate-x-1"
                to="/plans"
              >
                Gold
              </Link>
            </li>
            <li>
              <Link
                className="inline-block text-slate-300 transition hover:translate-x-1 hover:text-white"
                to="/plans"
              >
                Gold Plus
              </Link>
            </li>
            <li>
              <Link
                className="inline-block text-slate-300 transition hover:translate-x-1 hover:text-white"
                to="/plans"
              >
                Platinum
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#fcc419]">
            Resources
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                className="inline-block text-slate-300 transition hover:translate-x-1 hover:text-white"
                to="/contact"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <a
                className="inline-block text-slate-300 transition hover:translate-x-1 hover:text-white"
                href="#"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                className="inline-block text-slate-300 transition hover:translate-x-1 hover:text-white"
                href="#"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <Link
                className="inline-block text-slate-300 transition hover:translate-x-1 hover:text-white"
                to="/contact"
              >
                Claims Guide
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#fcc419]">
            Contact
          </h4>
          <p className="text-sm leading-relaxed text-slate-300">
            <a
              className="font-bold text-white transition hover:text-[#fcc419]"
              href={PHONE_TEL_HREF}
            >
              {PHONE_DISPLAY}
            </a>
            <br />
            <span className="mt-2 inline-block text-slate-400">
              Mon–Fri business hours — voicemail anytime
            </span>
          </p>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/5 px-8 pt-8 md:flex-row">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} {COMPANY_LEGAL_NAME}. All rights reserved.
        </p>
        <div className="flex gap-6 text-slate-400">
          <span className="material-symbols-outlined cursor-pointer transition hover:text-white">
            social_leaderboard
          </span>
          <span className="material-symbols-outlined cursor-pointer transition hover:text-white">
            brand_awareness
          </span>
          <span className="material-symbols-outlined cursor-pointer transition hover:text-white">
            emergency
          </span>
        </div>
      </div>
    </footer>
  )
}
