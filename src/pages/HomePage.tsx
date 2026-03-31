import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { IMG } from '../content/assets'

gsap.registerPlugin(ScrollTrigger)

export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 48,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        })
      })

      gsap.to('[data-parallax]', {
        xPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-parallax-wrap]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef}>
      <main className="grain pt-20">
        <section className="relative flex min-h-[min(92vh,920px)] items-center overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <img
              className="h-full w-full object-cover opacity-40"
              src={IMG.heroCar}
              alt=""
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-8 md:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  The gold standard of protection
                </span>
              </div>
              <h1 className="font-headline text-5xl font-black leading-[0.92] tracking-tighter text-white md:text-7xl lg:text-8xl">
                Drive with <br />
                <span className="text-secondary-container">Certainty.</span>
              </h1>
              <p className="max-w-lg text-xl font-light leading-relaxed text-primary-fixed-dim">
                KDM Automotive, LLC provides architectural-grade vehicle service
                contract coverage. No surprises — just high-end reliability.
              </p>
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="group flex items-center justify-center gap-2 rounded-full bg-secondary-container px-10 py-5 text-lg font-bold text-on-secondary-container shadow-2xl shadow-secondary/20 transition hover:shadow-[0_24px_60px_rgba(115,92,0,0.25)]"
                >
                  Get a Free Quote
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  to="/plans"
                  className="rounded-full border border-white/20 bg-white/5 px-10 py-5 text-center text-lg font-bold text-white backdrop-blur-md transition hover:bg-white/10"
                >
                  View Plans
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div
          data-parallax-wrap
          className="border-y border-white/10 bg-inverse-surface py-6 text-inverse-on-surface"
        >
          <div className="overflow-hidden">
            <p
              data-parallax
              className="whitespace-nowrap font-headline text-[clamp(2.5rem,12vw,7rem)] font-black uppercase leading-none tracking-tight text-white/90"
            >
              KDM Automotive · Architectural coverage · Roadside certainty ·
              Concierge claims ·
            </p>
          </div>
        </div>

        <section
          data-reveal
          className="bg-surface px-8 py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
              <div className="flex flex-col justify-center md:col-span-5">
                <h2 className="mb-6 font-headline text-4xl font-black tracking-tight text-primary md:text-5xl">
                  Protect Your <br />
                  Investment.
                </h2>
                <p className="mb-8 max-w-md text-lg text-on-surface-variant">
                  Modern vehicles are engineering marvels — precision comes with
                  a price. Do not let a single mechanical failure derail your
                  finances.
                </p>
                <div className="flex items-center gap-4 rounded-xl border-l-4 border-secondary bg-surface-container-low p-6">
                  <span className="material-symbols-outlined text-4xl text-secondary">
                    warning
                  </span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-primary">
                      Industry insight
                    </p>
                    <p className="text-on-surface-variant italic">
                      &ldquo;Average repair costs have increased by 22% in the
                      last 24 months.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-7">
                <div className="group flex flex-col justify-between rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm transition duration-500 hover:bg-primary">
                  <div>
                    <span className="material-symbols-outlined text-3xl text-secondary transition-colors group-hover:text-secondary-container">
                      settings_input_component
                    </span>
                    <h3 className="mt-4 font-headline text-xl font-bold text-primary transition-colors group-hover:text-white">
                      Engine
                    </h3>
                    <p className="text-sm text-on-surface-variant transition-colors group-hover:text-primary-fixed-dim">
                      Full block assembly replacement
                    </p>
                  </div>
                  <div className="mt-8">
                    <span className="font-headline text-4xl font-black text-primary transition-colors group-hover:text-secondary-container">
                      $3,500
                    </span>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-secondary">
                      Average cost
                    </p>
                  </div>
                </div>
                <div className="group flex flex-col justify-between rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm transition duration-500 hover:bg-primary">
                  <div>
                    <span className="material-symbols-outlined text-3xl text-secondary transition-colors group-hover:text-secondary-container">
                      manufacturing
                    </span>
                    <h3 className="mt-4 font-headline text-xl font-bold text-primary transition-colors group-hover:text-white">
                      Transmission
                    </h3>
                    <p className="text-sm text-on-surface-variant transition-colors group-hover:text-primary-fixed-dim">
                      System rebuild and calibration
                    </p>
                  </div>
                  <div className="mt-8">
                    <span className="font-headline text-4xl font-black text-primary transition-colors group-hover:text-secondary-container">
                      $2,150
                    </span>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-secondary">
                      Average cost
                    </p>
                  </div>
                </div>
                <div className="group flex items-center justify-between rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm transition duration-500 hover:bg-primary sm:col-span-2">
                  <div className="flex items-center gap-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container transition-colors group-hover:bg-white/10">
                      <span className="material-symbols-outlined text-3xl text-secondary transition-colors group-hover:text-secondary-container">
                        ac_unit
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline text-xl font-bold text-primary transition-colors group-hover:text-white">
                        AC compressor
                      </h3>
                      <p className="text-sm text-on-surface-variant transition-colors group-hover:text-primary-fixed-dim">
                        Unit replacement &amp; refrigerant recharge
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-headline text-4xl font-black text-primary transition-colors group-hover:text-secondary-container">
                      $863
                    </span>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-secondary">
                      Average cost
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          data-reveal
          className="bg-surface-container-low px-8 py-24"
        >
          <div className="mx-auto mb-16 max-w-7xl text-center">
            <h2 className="mb-4 font-headline text-4xl font-black uppercase tracking-tight text-primary">
              Choose your level of security
            </h2>
            <p className="mx-auto max-w-2xl text-on-surface-variant">
              From essential powertrain protection to platinum-tier concierge
              coverage — a plan aligned with how you drive.
            </p>
          </div>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-xl border-b-4 border-slate-300 bg-surface-container-lowest p-8 shadow-sm">
              <h3 className="mb-2 font-headline text-xl font-bold text-primary">
                Powertrain
              </h3>
              <p className="mb-6 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">
                Essential protection
              </p>
              <ul className="mb-8 flex-grow space-y-4">
                <li className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span
                    className="material-symbols-outlined text-sm text-green-600"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  Engine
                </li>
                <li className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span
                    className="material-symbols-outlined text-sm text-green-600"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  Transmission
                </li>
                <li className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span
                    className="material-symbols-outlined text-sm text-green-600"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  Drive axle
                </li>
                <li className="flex items-center gap-2 text-sm text-on-surface-variant/40 line-through">
                  <span className="material-symbols-outlined text-xs">close</span>
                  Air conditioning
                </li>
              </ul>
              <Link
                to="/contact"
                className="w-full rounded-lg border border-outline-variant py-3 text-center font-bold text-primary transition hover:bg-surface-container"
              >
                Select plan
              </Link>
            </div>

            <div className="relative flex flex-col overflow-hidden rounded-xl border-b-4 border-secondary bg-surface-container-lowest p-8 shadow-sm">
              <h3 className="mb-2 font-headline text-xl font-bold text-primary">
                Gold
              </h3>
              <p className="mb-6 text-xs font-bold uppercase tracking-widest text-secondary">
                Recommended
              </p>
              <ul className="mb-8 flex-grow space-y-4">
                {['All powertrain', 'Steering', 'Electrical components', 'Braking system'].map(
                  (t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2 text-sm font-medium text-on-surface-variant"
                    >
                      <span
                        className="material-symbols-outlined text-sm text-secondary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      {t}
                    </li>
                  ),
                )}
              </ul>
              <Link
                to="/contact"
                className="w-full rounded-lg bg-secondary py-3 text-center font-bold text-white transition hover:bg-primary"
              >
                Select plan
              </Link>
            </div>

            <div className="flex flex-col rounded-xl border-b-4 border-secondary/60 bg-surface-container-lowest p-8 shadow-sm">
              <h3 className="mb-2 font-headline text-xl font-bold text-primary">
                Gold Plus
              </h3>
              <p className="mb-6 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">
                Advanced coverage
              </p>
              <ul className="mb-8 flex-grow space-y-4">
                {['All Gold plan', 'Cooling system', 'Fuel delivery', 'Suspension'].map(
                  (t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2 text-sm text-on-surface-variant"
                    >
                      <span
                        className="material-symbols-outlined text-sm text-secondary/60"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      {t}
                    </li>
                  ),
                )}
              </ul>
              <Link
                to="/contact"
                className="w-full rounded-lg border border-outline-variant py-3 text-center font-bold text-primary transition hover:bg-surface-container"
              >
                Select plan
              </Link>
            </div>

            <div className="relative flex flex-col overflow-hidden rounded-xl border-b-4 border-secondary bg-primary p-8 text-white shadow-xl">
              <div className="absolute right-4 top-4 rounded bg-secondary px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
                Elite
              </div>
              <h3 className="mb-2 font-headline text-xl font-bold text-secondary-container">
                Platinum
              </h3>
              <p className="mb-6 text-xs font-bold uppercase tracking-widest text-white/60">
                Exclusionary coverage
              </p>
              <ul className="mb-8 flex-grow space-y-4">
                {[
                  ['stars', 'Comprehensive shell'],
                  ['stars', 'Hi-tech electronics'],
                  ['stars', 'Luxury features'],
                  ['verified_user', 'Concierge claims'],
                ].map(([icon, t]) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-white">
                    <span
                      className="material-symbols-outlined text-sm text-secondary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {icon}
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="w-full rounded-lg bg-secondary-container py-3 text-center font-black text-primary transition hover:bg-white"
              >
                Go Platinum
              </Link>
            </div>
          </div>
        </section>

        <section
          data-reveal
          className="relative flex min-h-[560px] items-center bg-tertiary"
        >
          <div className="absolute inset-0 overflow-hidden opacity-20 grayscale">
            <img
              className="h-full w-full object-cover"
              src={IMG.technician}
              alt=""
              width={1920}
              height={1080}
            />
          </div>
          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="font-headline text-4xl font-black leading-tight text-white md:text-5xl">
                Mastery in <br />
                repair management.
              </h2>
              <p className="text-lg text-on-tertiary-container">
                We do not only pay for parts — we manage the restoration of your
                vehicle&apos;s integrity. Certified master technicians help
                return your car to the road in peak condition.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <p className="font-headline text-3xl font-black text-secondary-container">
                    15,000+
                  </p>
                  <p className="text-sm font-bold uppercase tracking-widest text-white/60">
                    Certified shops
                  </p>
                </div>
                <div>
                  <p className="font-headline text-3xl font-black text-secondary-container">
                    24/7
                  </p>
                  <p className="text-sm font-bold uppercase tracking-widest text-white/60">
                    Claims support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
