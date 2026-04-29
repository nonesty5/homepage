# MERIDIAN Homepage

## Getting Started

Install dependencies and run the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Security Configuration

Production deployments must set these environment variables in Vercel:

- `RESEND_API_KEY`: server-only API key used by `/api/contact`.
- `RESEND_FROM_EMAIL`: verified sender address for contact email delivery.
- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST URL for shared contact rate limiting.
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST token for shared contact rate limiting.
- `CONTACT_ALLOWED_ORIGINS`: optional comma-separated list for explicit preview/staging origins that may submit `/api/contact`.
- `ENABLE_PREVIEW_PAGE`: leave unset in production unless `/preview` is intentionally being reviewed.

Only `NEXT_PUBLIC_*` variables may be exposed to the browser. Do not put secrets in `NEXT_PUBLIC_*`, `public/`, or committed docs.

## Verification

Run the same checks used by CI before deployment:

```bash
npm audit --audit-level=moderate
npm audit signatures
npm run audit:content
npm run lint
npm run build
```

## Deploy on Vercel

The production deployment runs on Vercel. Keep `.env*`, generated reports, local screenshots, and docs excluded from deployment through `.vercelignore`.
