export type QuotePayload = {
  name: string
  email: string
  phone: string
  year: string
  vehicle: string
  mileage: string
}

const WEB3_ENDPOINT = 'https://api.web3forms.com/submit'

function formatMessage(p: QuotePayload): string {
  return [
    'New quote request from website',
    '',
    `Phone: ${p.phone || '(not provided)'}`,
    `Vehicle year: ${p.year || '(not provided)'}`,
    `Make/Model: ${p.vehicle || '(not provided)'}`,
    `Current mileage: ${p.mileage || '(not provided)'}`,
  ].join('\n')
}

/** Posts to Web3Forms (separate from FormSubmit; avoids their outages). */
export async function submitWeb3Quote(
  payload: QuotePayload,
  accessKey: string,
): Promise<void> {
  const res = await fetch(WEB3_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: 'New KDM Quote Request',
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      message: formatMessage(payload),
      botcheck: '',
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
}
