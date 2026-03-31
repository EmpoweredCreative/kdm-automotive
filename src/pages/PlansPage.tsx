import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CoverageDetailModal,
  type CoverageModalTab,
} from '../components/CoverageDetailModal'
import { IMG } from '../content/assets'
import type { PlanId } from '../content/planCoverageDetails'

gsap.registerPlugin(ScrollTrigger)

function DetailButton({
  planId,
  onOpen,
  variant,
}: {
  planId: PlanId
  onOpen: (t: CoverageModalTab) => void
  variant: 'onPrimary' | 'onGold'
}) {
  const cls =
    variant === 'onPrimary'
      ? 'inline-flex w-full max-w-[200px] items-center justify-center gap-1.5 rounded-full border border-white/35 bg-white/5 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-white/12'
      : 'inline-flex w-full max-w-[200px] items-center justify-center gap-1.5 rounded-full border border-primary/45 bg-white/50 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-primary transition hover:bg-white/80'

  return (
    <button type="button" className={cls} onClick={() => onOpen(planId)}>
      <span className="material-symbols-outlined text-base" aria-hidden>
        article
      </span>
      Full coverage
    </button>
  )
}

const rows = [
  { label: 'Engine', icon: 'settings', checks: [true, true, true, true] },
  { label: 'Transmission', icon: 'minor_crash', checks: [true, true, true, true] },
  { label: 'Drive axle', icon: 'tire_repair', checks: [true, true, true, true] },
  { label: 'Air conditioning', icon: 'ac_unit', checks: [false, true, true, true] },
  { label: 'Electrical systems', icon: 'electric_car', checks: [false, true, true, true] },
  { label: 'Fuel system', icon: 'ev_station', checks: [false, false, true, true] },
  { label: 'Full exclusionary', icon: 'shield', checks: [false, false, false, true] },
] as const

function Cell({ ok }: { ok: boolean }) {
  if (ok) {
    return (
      <span
        className="material-symbols-outlined text-secondary"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        check_circle
      </span>
    )
  }
  return <span className="material-symbols-outlined text-slate-300">remove</span>
}

export function PlansPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [coverageModal, setCoverageModal] = useState<{
    open: boolean
    tab: CoverageModalTab
  }>({ open: false, tab: 'powertrain' })

  function openCoverage(tab: CoverageModalTab) {
    setCoverageModal({ open: true, tab })
  }

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef}>
      <header className="grain px-8 pb-20 pt-32">
        <div className="mx-auto flex max-w-7xl flex-col items-end gap-12 md:flex-row">
          <div className="flex-1">
            <h1 className="mb-6 font-headline text-5xl font-black leading-none tracking-tighter text-primary md:text-7xl">
              ENGINEERED <br />
              PROTECTION.
            </h1>
            <p className="max-w-xl text-xl leading-relaxed text-on-surface-variant">
              Select from four tiers of architectural coverage designed to keep
              your vehicle on the road and your finances secure.
            </p>
          </div>
          <div className="mb-8 hidden h-px w-32 bg-secondary md:block" />
        </div>
      </header>

      <main className="grain px-8 pb-32">
        <div data-reveal className="mx-auto max-w-7xl">
          <div className="overflow-x-auto rounded-xl shadow-2xl">
            <div className="min-w-[960px] bg-surface-container-lowest">
              <div className="plan-matrix items-stretch bg-primary text-white">
                <div className="flex items-center border-r border-white/5 p-8">
                  <span className="font-headline text-xs font-bold uppercase tracking-[0.2em] text-on-primary-container">
                    Coverage details
                  </span>
                </div>
                <div className="flex flex-col justify-between gap-4 border-r border-white/5 p-8">
                  <div>
                    <h3 className="font-headline text-xl font-bold">Powertrain</h3>
                    <p className="mt-2 text-[0.65rem] uppercase tracking-widest text-slate-400">
                      Essential support
                    </p>
                  </div>
                  <DetailButton
                    planId="powertrain"
                    variant="onPrimary"
                    onOpen={openCoverage}
                  />
                </div>
                <div className="flex flex-col justify-between gap-4 border-r border-white/5 p-8">
                  <div>
                    <h3 className="font-headline text-xl font-bold">Gold</h3>
                    <p className="mt-2 text-[0.65rem] uppercase tracking-widest text-slate-400">
                      Standard care
                    </p>
                  </div>
                  <DetailButton planId="gold" variant="onPrimary" onOpen={openCoverage} />
                </div>
                <div className="flex flex-col justify-between gap-4 border-r border-white/5 p-8">
                  <div>
                    <h3 className="font-headline text-xl font-bold">Gold Plus</h3>
                    <p className="mt-2 text-[0.65rem] uppercase tracking-widest text-slate-400">
                      Enhanced shield
                    </p>
                  </div>
                  <DetailButton
                    planId="goldPlus"
                    variant="onPrimary"
                    onOpen={openCoverage}
                  />
                </div>
                <div className="relative flex flex-col justify-between gap-4 overflow-hidden bg-secondary-container p-8 text-primary">
                  <div className="pointer-events-none absolute -right-4 -top-4 opacity-10">
                    <span
                      className="material-symbols-outlined text-8xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      workspace_premium
                    </span>
                  </div>
                  <div>
                    <span className="mb-2 inline-block rounded-sm bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                      Recommended
                    </span>
                    <h3 className="font-headline text-2xl font-black">Platinum</h3>
                    <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-widest text-on-secondary-container">
                      Total exclusionary
                    </p>
                  </div>
                  <DetailButton
                    planId="platinum"
                    variant="onGold"
                    onOpen={openCoverage}
                  />
                </div>
              </div>

              <div className="divide-y divide-surface-container">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="plan-matrix transition-colors hover:bg-surface-container-low"
                  >
                    <div className="flex items-center gap-4 p-6 md:p-8">
                      <span className="material-symbols-outlined text-primary opacity-40">
                        {row.icon}
                      </span>
                      <span className="font-semibold text-primary">{row.label}</span>
                    </div>
                    {row.checks.map((c, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-center p-6 md:p-8 ${
                          i === 3 ? 'bg-secondary-container/10' : ''
                        }`}
                      >
                        <Cell ok={c} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="plan-matrix bg-surface-container-high">
                <div className="hidden border-r border-outline-variant/30 p-8 md:block" />
                {['Powertrain', 'Gold', 'Gold+', 'Platinum'].map((label, i) => (
                  <div
                    key={label}
                    className={`border-r border-outline-variant/30 p-8 last:border-r-0 ${
                      i === 3 ? 'bg-secondary-container' : ''
                    }`}
                  >
                    {i === 3 ? (
                      <Link
                        to="/contact"
                        className="block w-full rounded-lg bg-primary py-4 text-center text-xs font-black uppercase tracking-widest text-on-secondary-container shadow-lg transition hover:shadow-primary/20"
                      >
                        Get {label} quote
                      </Link>
                    ) : (
                      <Link
                        to="/contact"
                        className="block w-full rounded-lg border-2 border-primary py-4 text-center text-xs font-black uppercase tracking-widest text-primary transition hover:bg-primary hover:text-white"
                      >
                        Get {label} quote
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:flex-wrap sm:gap-2">
            <p className="text-sm text-on-surface-variant">
              Need the official comparison sheet or exclusions?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => openCoverage('brochure')}
                className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant/40 bg-surface-container-lowest px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary shadow-sm transition hover:border-primary/40 hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-base">image</span>
                View brochure image
              </button>
              <button
                type="button"
                onClick={() => openCoverage('exclusions')}
                className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant/40 bg-surface-container-lowest px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary shadow-sm transition hover:border-primary/40 hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-base">gpp_maybe</span>
                What&apos;s not covered
              </button>
            </div>
          </div>
        </div>

        <CoverageDetailModal
          open={coverageModal.open}
          tab={coverageModal.tab}
          onTabChange={(tab) => setCoverageModal((m) => ({ ...m, tab }))}
          onClose={() => setCoverageModal((m) => ({ ...m, open: false }))}
        />

        <section
          data-reveal
          className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3"
        >
          <div className="relative flex min-h-[400px] flex-col justify-end overflow-hidden rounded-xl bg-primary p-12 text-white md:col-span-2">
            <div className="absolute inset-0 z-0 opacity-40">
              <img
                src={IMG.plansEngine}
                alt=""
                className="h-full w-full object-cover"
                width={1600}
                height={1000}
              />
            </div>
            <div className="relative z-10">
              <h2 className="mb-4 font-headline text-4xl font-bold">
                Precision assistance
              </h2>
              <p className="max-w-md text-lg text-on-primary-container">
                Every plan includes 24/7 roadside assistance — wherever you go,
                structural support follows.
              </p>
            </div>
          </div>
          <div className="group flex cursor-pointer flex-col justify-between rounded-xl bg-secondary-container p-8 transition hover:bg-secondary">
            <span
              className="material-symbols-outlined text-5xl text-primary transition-colors group-hover:text-white"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              history_edu
            </span>
            <div>
              <h3 className="font-headline text-2xl font-black text-primary transition-colors group-hover:text-white">
                Digital claims
              </h3>
              <p className="mt-2 text-on-secondary-fixed-variant transition-colors group-hover:text-white/80">
                Filing a claim feels like a concierge service — fast, transparent,
                fully mobile.
              </p>
            </div>
          </div>
        </section>

        <section data-reveal className="mx-auto mt-32 max-w-7xl bg-surface-container-low py-32">
          <div className="grid grid-cols-1 gap-20 px-8 md:grid-cols-2">
            <div>
              <h4 className="mb-4 font-headline text-xs font-black uppercase tracking-[0.3em] text-secondary">
                The Platinum advantage
              </h4>
              <h2 className="mb-8 font-headline text-4xl font-black leading-tight text-primary md:text-5xl">
                Exclusionary coverage: the gold standard of warranty.
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-on-surface-variant">
                Unlike standard warranties that list what is covered, Platinum
                lists only what is not. If it is not on the short list of
                exceptions, it is covered — from sensors to luxury electronics.
              </p>
              <div className="flex gap-4">
                <div className="flex-1 rounded-xl border border-outline-variant/20 bg-white p-6 shadow-sm">
                  <span className="mb-2 block font-headline text-3xl font-black text-primary">
                    0%
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Financing options
                  </span>
                </div>
                <div className="flex-1 rounded-xl border border-outline-variant/20 bg-white p-6 shadow-sm">
                  <span className="mb-2 block font-headline text-3xl font-black text-primary">
                    60k+
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Approved shops
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={IMG.dashboard}
                  alt=""
                  className="h-full w-full object-cover"
                  width={900}
                  height={1120}
                />
              </div>
              <div className="absolute -bottom-8 -left-8 max-w-xs rounded-xl bg-primary p-8 text-white shadow-2xl">
                <p className="text-lg font-bold italic leading-snug">
                  &ldquo;The most comprehensive protection I have ever owned.
                  Platinum truly covers everything.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-1 w-8 bg-secondary" />
                  <span className="text-xs font-black uppercase tracking-widest text-on-primary-container">
                    Marcus V., Porsche owner
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
