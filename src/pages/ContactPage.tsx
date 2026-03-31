import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { IMG } from '../content/assets'
import {
  CONTACT_EMAIL_DISPLAY,
  CONTACT_EMAIL_MAILTO,
  PHONE_DISPLAY,
  PHONE_TEL_HREF,
} from '../constants/site'
import { submitQuote } from '../lib/submitQuote'

gsap.registerPlugin(ScrollTrigger)

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [formError, setFormError] = useState<string | null>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setFormError(null)
    setFormStatus('loading')

    const fd = new FormData(form)
    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
      year: String(fd.get('year') ?? '').trim(),
      vehicle: String(fd.get('vehicle') ?? '').trim(),
      mileage: String(fd.get('mileage') ?? '').trim(),
    }

    try {
      await submitQuote(payload)
      setFormStatus('success')
      form.reset()
    } catch (err) {
      setFormStatus('error')
      setFormError(
        err instanceof Error ? err.message : 'Something went wrong. Please call us.',
      )
    }
  }

  return (
    <div ref={rootRef}>
      <main className="grain pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-8">
          <div
            data-reveal
            className="mb-24 grid grid-cols-1 items-end gap-16 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <span className="mb-6 inline-block rounded-full bg-secondary-container px-4 py-1 text-xs font-bold uppercase tracking-widest text-on-secondary-container">
                Request protection
              </span>
              <h1 className="mb-8 font-headline text-5xl font-extrabold leading-[1.08] tracking-tighter text-primary md:text-7xl">
                Precision security for your{' '}
                <span className="italic text-secondary">journey.</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-on-surface-variant">
                Secure your vehicle&apos;s future with comprehensive protection.
                Complete the form to receive a tailored warranty plan aligned
                with how you drive.
              </p>
            </div>
            <div className="relative hidden overflow-hidden rounded-xl lg:col-span-5 lg:block">
              <img
                src={IMG.contactAccent}
                alt=""
                className="h-48 w-full object-cover opacity-80 grayscale transition duration-700 hover:grayscale-0"
                width={800}
                height={400}
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div data-reveal className="space-y-8 lg:col-span-2">
              <section className="rounded-xl bg-surface-container-lowest p-8 shadow-2xl shadow-primary/5 md:p-12">
                <div className="mb-10 flex items-center gap-3">
                  <span className="material-symbols-outlined text-3xl text-secondary">
                    description
                  </span>
                  <h2 className="font-headline text-2xl font-bold text-primary">
                    Quote information
                  </h2>
                </div>
                <form className="space-y-8" onSubmit={onSubmit} noValidate>
                  <div
                    className="rounded-lg border border-outline-variant/25 bg-surface-container px-4 py-3 text-sm"
                    aria-live="polite"
                  >
                    {formStatus === 'success' ? (
                      <p className="font-semibold text-tertiary-container">
                        Thank you — we received your request and will follow up
                        shortly. You can also call{' '}
                        <a className="underline" href={PHONE_TEL_HREF}>
                          {PHONE_DISPLAY}
                        </a>
                        .
                      </p>
                    ) : null}
                    {formStatus === 'error' && formError ? (
                      <p className="text-error" role="alert">
                        {formError}
                      </p>
                    ) : null}
                    {formStatus === 'idle' || formStatus === 'loading' ? (
                      <p className="text-on-surface-variant">
                        Submit to request a quote. Required: name and email.
                      </p>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="ml-1 text-xs font-bold uppercase tracking-wider text-primary">
                        Full name
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Jane Doe"
                        className="w-full rounded-lg border-none bg-surface-container-high p-4 transition focus:bg-surface-container-lowest focus:ring-0 focus:border-b-2 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="ml-1 text-xs font-bold uppercase tracking-wider text-primary">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="jane@example.com"
                        className="w-full rounded-lg border-none bg-surface-container-high p-4 transition focus:bg-surface-container-lowest focus:ring-0 focus:border-b-2 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="ml-1 text-xs font-bold uppercase tracking-wider text-primary">
                        Phone
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="443-784-2071"
                        className="w-full rounded-lg border-none bg-surface-container-high p-4 transition focus:bg-surface-container-lowest focus:ring-0 focus:border-b-2 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="ml-1 text-xs font-bold uppercase tracking-wider text-primary">
                        Vehicle year
                      </label>
                      <select
                        name="year"
                        className="w-full rounded-lg border-none bg-surface-container-high p-4 transition focus:bg-surface-container-lowest focus:ring-0 focus:border-b-2 focus:border-primary"
                        defaultValue="2024"
                      >
                        <option>2026</option>
                        <option>2025</option>
                        <option>2024</option>
                        <option>2023</option>
                        <option>2022</option>
                        <option>Earlier</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="ml-1 text-xs font-bold uppercase tracking-wider text-primary">
                        Make / model
                      </label>
                      <input
                        name="vehicle"
                        type="text"
                        placeholder="e.g. BMW X5"
                        className="w-full rounded-lg border-none bg-surface-container-high p-4 transition focus:bg-surface-container-lowest focus:ring-0 focus:border-b-2 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="ml-1 text-xs font-bold uppercase tracking-wider text-primary">
                        Current mileage
                      </label>
                      <input
                        name="mileage"
                        type="number"
                        placeholder="45,000"
                        className="w-full rounded-lg border-none bg-surface-container-high p-4 transition focus:bg-surface-container-lowest focus:ring-0 focus:border-b-2 focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-lg bg-surface-container p-4">
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      shield
                    </span>
                    <p className="text-sm leading-relaxed text-on-surface-variant">
                      Your data is handled with care. We never sell your
                      information.{' '}
                      <a
                        className="font-bold text-primary underline decoration-secondary/30 underline-offset-4"
                        href="#"
                      >
                        Privacy policy
                      </a>
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="group flex w-full items-center justify-center gap-3 rounded-full bg-primary px-12 py-5 font-headline text-lg font-bold text-white shadow-xl shadow-primary/20 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                  >
                    {formStatus === 'loading' ? 'Sending…' : 'Get My Free Quote'}
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </button>
                </form>
              </section>
            </div>

            <div data-reveal className="space-y-8">
              <div className="relative overflow-hidden rounded-xl bg-primary p-8 text-white">
                <div className="relative z-10">
                  <h3 className="mb-6 font-headline text-2xl font-bold">
                    Sign Up Today
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-primary-fixed-dim">
                    Request a quote with the form, or call or email for plan
                    questions and seller paperwork — not for opening repair claims
                    (see &ldquo;Filing a claim&rdquo; below).
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-secondary-container">
                        call
                      </span>
                      <div>
                        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-on-primary-container">
                          Sales &amp; general
                        </p>
                        <a
                          className="text-lg font-bold text-white underline-offset-2 hover:underline"
                          href={PHONE_TEL_HREF}
                        >
                          {PHONE_DISPLAY}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-secondary-container">
                        mail
                      </span>
                      <div>
                        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-on-primary-container">
                          General inquiries
                        </p>
                        <a
                          className="text-sm text-white opacity-90 underline-offset-2 hover:underline"
                          href={CONTACT_EMAIL_MAILTO}
                        >
                          {CONTACT_EMAIL_DISPLAY}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute -bottom-8 -right-8 opacity-10">
                  <span
                    className="material-symbols-outlined text-[120px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified_user
                  </span>
                </div>
              </div>

              <div className="rounded-xl border-l-4 border-secondary bg-surface-container-low p-8">
                <h3 className="mb-4 font-headline text-xl font-bold text-primary">
                  Already covered? Filing a claim
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-on-surface-variant">
                  <strong className="text-primary">KDM Automotive, LLC</strong> is
                  the <strong>seller</strong> of your vehicle service contract — not
                  the claims administrator. When you need a covered repair, your{' '}
                  <strong>licensed repair facility</strong> opens the claim by
                  calling the <strong>claims number on your contract</strong>{' '}
                  (and following the steps shown there). That is how the
                  administrator authorizes covered work — not by calling KDM&apos;s
                  sales line.
                </p>
                <p className="mb-4 text-sm leading-relaxed text-on-surface-variant">
                  Bring your contract or member materials to the shop so they have
                  the correct administrator contact and your plan details.
                </p>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Questions about your purchase or paperwork from KDM? Use the{' '}
                  <strong className="text-primary">Sign Up Today</strong> phone or
                  email above — not for opening repair claims.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-secondary-container/10 p-6 text-center">
                  <p className="mb-1 font-headline text-3xl font-extrabold text-primary">
                    98%
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                    Payout rate
                  </p>
                </div>
                <div className="rounded-xl bg-secondary-container/10 p-6 text-center">
                  <p className="mb-1 font-headline text-3xl font-extrabold text-primary">
                    24h
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                    Response
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-16 text-center text-sm text-on-surface-variant">
            Prefer to browse first?{' '}
            <Link className="font-bold text-primary underline" to="/plans">
              Compare coverage tiers
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
