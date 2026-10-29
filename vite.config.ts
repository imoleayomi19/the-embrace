import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { processContactSubmission } from './api/contact'
import { processSubscribe } from './api/subscribe'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.RESEND_FROM = process.env.RESEND_FROM || env.RESEND_FROM || ''
  process.env.CONTACT_RECIPIENT_EMAIL =
    process.env.CONTACT_RECIPIENT_EMAIL || env.CONTACT_RECIPIENT_EMAIL || ''
  process.env.RESEND_API_KEY = process.env.RESEND_API_KEY || env.RESEND_API_KEY || ''

  return {
    base: '/',
    plugins: [
      react(),
      {
        name: 'api-contact-dev-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const urlPath = req.url ? req.url.split('?')[0] : ''
            if (urlPath === '/api/contact' && req.method === 'POST') {
              let rawBody = ''
              req.on('data', (chunk: Buffer | string) => {
                rawBody += chunk
              })
              req.on('end', async () => {
                try {
                  const parsed = rawBody ? JSON.parse(rawBody) : {}
                  const result = await processContactSubmission(parsed, {
                    apiKey: env.RESEND_API_KEY || process.env.RESEND_API_KEY,
                  })

                  res.statusCode = result.status
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify(result.body))
                } catch (error: unknown) {
                  const message =
                    error instanceof Error ? error.message : 'Server error occurred'
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: message }))
                }
              })
              return
            }

            if (urlPath === '/api/subscribe' && req.method === 'POST') {
              let rawBody = ''
              req.on('data', (chunk: Buffer | string) => {
                rawBody += chunk
              })
              req.on('end', async () => {
                try {
                  const parsed = rawBody ? JSON.parse(rawBody) : {}
                  const result = await processSubscribe(parsed, {
                    apiKey: env.RESEND_API_KEY || process.env.RESEND_API_KEY,
                  })

                  res.statusCode = result.status
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify(result.body))
                } catch (error: unknown) {
                  const message =
                    error instanceof Error ? error.message : 'Server error occurred'
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: message }))
                }
              })
              return
            }
            next()
          })
        },
      },
    ],
    server: {
      watch: {
        usePolling: true,
      },
    },
  }
})
