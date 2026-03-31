import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import sgMail from '@sendgrid/mail'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// Always load .env from project root (next to package.json), not only from process.cwd()
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const app = express()
const PORT = Number(process.env.PORT || 8787)
const BIND_HOST = process.env.BIND_HOST || '0.0.0.0'

app.use(cors({ origin: true }))
app.use(express.json({ limit: '64kb' }))

function health(_req, res) {
  res.json({ ok: true })
}

async function quote(req, res) {
  const { name, email, phone, year, vehicle, mileage } = req.body ?? {}

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' })
  }

  const apiKey = process.env.SENDGRID_API_KEY
  const fromEmail = process.env.SENDGRID_FROM_EMAIL
  const toEmail = process.env.SENDGRID_TO_EMAIL
  const senderName = process.env.SENDGRID_SENDER_NAME || 'KDM Automotive, LLC'
  const subject = process.env.SENDGRID_SUBJECT || 'New Quote Request'

  if (!apiKey || !fromEmail || !toEmail) {
    return res.status(500).json({
      error:
        'Email service is not configured. Missing SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, or SENDGRID_TO_EMAIL.',
    })
  }

  sgMail.setApiKey(apiKey)

  const lines = [
    'New quote request from website',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || '(not provided)'}`,
    `Vehicle year: ${year || '(not provided)'}`,
    `Make/Model: ${vehicle || '(not provided)'}`,
    `Current mileage: ${mileage || '(not provided)'}`,
  ]

  try {
    await sgMail.send({
      to: toEmail,
      from: {
        email: fromEmail,
        name: senderName,
      },
      replyTo: email,
      subject,
      text: lines.join('\n'),
      html: `<pre style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.5">${lines.join('\n')}</pre>`,
    })

    return res.json({ ok: true })
  } catch (error) {
    console.error('SendGrid send error:', error)
    // Use 500 so this is not confused with nginx "upstream down" (502)
    return res.status(500).json({ error: 'Failed to send form. Please try again.' })
  }
}

app.get('/api/health', health)
app.get('/health', health)

app.post('/api/quote', quote)
/** If nginx uses `proxy_pass http://127.0.0.1:8787/;` (trailing slash), the path becomes /quote — handle that too. */
app.post('/quote', quote)

app.listen(PORT, BIND_HOST, () => {
  const envPath = path.join(__dirname, '..', '.env')
  const sgOk = Boolean(
    process.env.SENDGRID_API_KEY &&
      process.env.SENDGRID_FROM_EMAIL &&
      process.env.SENDGRID_TO_EMAIL,
  )
  console.log(
    `[quote-api] listening http://${BIND_HOST}:${PORT} | .env: ${envPath} | SendGrid env: ${sgOk ? 'ok' : 'INCOMPLETE (check Forge env + pm2 reload)'}`,
  )
})
