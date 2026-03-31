/** Quote payload from the contact form. */
export type QuotePayload = {
  name: string
  email: string
  phone: string
  year: string
  vehicle: string
  mileage: string
}

const WEB3_ENDPOINT = 'https://api.web3forms.com/submit'

function formatQuoteBody(p: QuotePayload): string {
  return [
    'New quote request from website',
    '',
    `Phone: ${p.phone || '(not provided)'}`,
    `Vehicle year: ${p.year || '(not provided)'}`,
    `Make/Model: ${p.vehicle || '(not provided)'}`,
    `Current mileage: ${p.mileage || '(not provided)'}`,
  ].join('\n')
}

/**
 * Production (static): Web3Forms — no backend or nginx. Set
 * `VITE_WEB3FORMS_ACCESS_KEY` at build time (e.g. Forge env before `npm run build`).
 * Local: omit the key and use `/api/quote` + SendGrid via `npm run dev`.
 */
export async function submitQuote(payload: QuotePayload): Promise<void> {
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()

  if (web3Key) {
    const res = await fetch(WEB3_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: web3Key,
        subject: 'New KDM Quote Request',
        name: payload.name,
        email: payload.email,
        message: formatQuoteBody(payload),
      }),
    })
    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean
      message?: string
    }
    if (!data.success) {
      throw new Error(
        data.message || 'Could not send your request. Please try again.',
      )
    }
    return
  }

  const res = await fetch('/api/quote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const data = (await res.json().catch(() => ({}))) as { error?: string }
  if (!res.ok) {
    const fallback =
      res.status === 404
        ? 'Quote API not running. Use VITE_WEB3FORMS_ACCESS_KEY for production, or run npm run dev for local SendGrid.'
        : 'Could not send your request.'
    throw new Error(data.error || fallback)
  }
}
