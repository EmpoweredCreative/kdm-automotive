import { useEffect, useId, useRef } from 'react'
import {
  ADMIN_AND_LEGAL,
  NOT_COVERED_ITEMS,
  PLAN_COVERAGE_SECTIONS,
  PLAN_LABELS,
  PLAN_ORDER,
  PLAN_SUMMARY,
  type PlanId,
} from '../content/planCoverageDetails'

export type CoverageModalTab = PlanId | 'exclusions' | 'brochure'

type Props = {
  open: boolean
  onClose: () => void
  /** Active section (controlled) */
  tab: CoverageModalTab
  onTabChange: (tab: CoverageModalTab) => void
}

const TABS: { id: CoverageModalTab; label: string }[] = [
  ...PLAN_ORDER.map((id) => ({ id, label: PLAN_LABELS[id] })),
  { id: 'exclusions', label: 'Not covered' },
  { id: 'brochure', label: 'Brochure' },
]

export function CoverageDetailModal({
  open,
  onClose,
  tab,
  onTabChange,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (open) {
      if (!el.open) el.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      if (el.open) el.close()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function onBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[100] m-0 h-full w-full max-w-none border-0 bg-black/55 p-4 open:flex open:items-center open:justify-center"
      aria-labelledby={titleId}
      onClick={onBackdropClick}
      onClose={onClose}
    >
      <div
        className="flex max-h-[min(90vh,880px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-surface-container-lowest shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-outline-variant/20 bg-primary px-6 py-5 text-white">
          <div>
            <h2 id={titleId} className="font-headline text-xl font-black md:text-2xl">
              Plan coverage details
            </h2>
            <p className="mt-1 text-sm text-primary-fixed-dim">
              Summary from your KDM Automotive plan brochure — confirm specifics
              on your contract.
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-lg p-2 text-white/90 transition hover:bg-white/10"
            aria-label="Close"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="border-b border-outline-variant/15 bg-surface-container-low px-4 py-3">
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Coverage sections"
          >
            {TABS.map(({ id, label }) => {
              const active = tab === id
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={[
                    'rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition',
                    active
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-surface-container-high text-primary hover:bg-surface-container',
                  ].join(' ')}
                  onClick={() => onTabChange(id)}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          {tab === 'brochure' ? (
            <div className="space-y-4">
              <p className="text-sm text-on-surface-variant">
                Official plan comparison artwork. Pinch or scroll to read fine
                print; structured lists are available in the plan tabs above.
              </p>
              <div className="overflow-hidden rounded-xl border border-outline-variant/20 bg-white shadow-inner">
                <img
                  src="/images/first-mile-plans-brochure.png"
                  alt="KDM Automotive warranty plans brochure comparing Powertrain, Gold, Gold Plus, and Platinum coverage"
                  className="h-auto w-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          ) : tab === 'exclusions' ? (
            <div className="space-y-4">
              <div className="rounded-xl border-l-4 border-tertiary-container bg-tertiary-fixed/30 px-4 py-3">
                <p className="font-headline text-sm font-bold text-tertiary">
                  What is not covered
                </p>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Typical exclusions — always read your service contract for the
                  authoritative list.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-on-surface">
                {NOT_COVERED_ITEMS.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <div className="space-y-3 border-t border-outline-variant/20 pt-6 text-xs leading-relaxed text-on-surface-variant">
                <p>
                  <span className="font-bold text-primary">Administrator: </span>
                  {ADMIN_AND_LEGAL.administrator}
                </p>
                <p>
                  <span className="font-bold text-primary">Contact: </span>
                  {ADMIN_AND_LEGAL.contact}
                </p>
                {ADMIN_AND_LEGAL.notes.map((n) => (
                  <p key={n}>{n}</p>
                ))}
              </div>
            </div>
          ) : (
            <PlanDetailContent planId={tab} />
          )}
        </div>

        <div className="border-t border-outline-variant/15 bg-surface-container-low px-6 py-4">
          <button
            type="button"
            className="w-full rounded-xl bg-secondary-container py-3 text-center text-sm font-bold text-on-secondary-container transition hover:brightness-95 md:w-auto md:px-8"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  )
}

function PlanDetailContent({ planId }: { planId: PlanId }) {
  const sections = PLAN_COVERAGE_SECTIONS[planId]
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-headline text-2xl font-black text-primary">
          {PLAN_LABELS[planId]} plan
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
          {PLAN_SUMMARY[planId]}
        </p>
      </div>
      {sections.map((block) => (
        <div key={block.heading}>
          <h4 className="mb-2 font-headline text-sm font-bold uppercase tracking-widest text-secondary">
            {block.heading}
          </h4>
          <ul className="space-y-1.5 text-sm leading-relaxed text-on-surface">
            {block.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span
                  className="mt-0.5 shrink-0 text-secondary"
                  aria-hidden
                >
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
