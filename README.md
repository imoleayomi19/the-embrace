
## Getting Started

1. Run `npm install`
2. Run `npm run dev`

## Contact form email

The contact form sends submissions to `info@embracetechng.com` through the Vercel
serverless function at `/api/contact`, which delivers email using Resend.

Set `RESEND_API_KEY`, `RESEND_FROM="Embrace Technologies <info@embracetechng.com>"`
and `CONTACT_RECIPIENT_EMAIL=info@embracetechng.com` as environment variables
in the Vercel project settings for every environment that should receive contact
submissions (Preview and Production). For local development, create a
`.env.local` file in the project root and add those variables. Do not commit this
file or expose the API key in frontend code. `npm run dev` serves `/api/contact`
through Vite's local middleware.

In Resend, verify the `embracetechng.com` sending domain before deploying. The
function sends from `info@embracetechng.com`; Resend will reject delivery until
the sender domain is verified.


##  **** NAVBAR ****

this are the link to be their in the navbar  
	Home 
	About - Projects
	Solutions - Industries
	Products - Shops
	Training Academy - resources
	Support Center - contactUs
