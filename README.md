<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# Momentum2025

Next.js (App Router, TypeScript) + Stripe Payment Link.

## Dev
1) Put your Stripe Payment Link in `.env.local`:
   NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/cNi00k4Bd05sgmY22Uf7i02
2) Install & run:
   npm install
   npm run dev  # http://localhost:3000

## Deploy (Netlify)
- Connect repo in Netlify → Build: `npm run build` (Node 20), plugin: `@netlify/plugin-nextjs`.
- (Optional) Set NEXT_PUBLIC_STRIPE_PAYMENT_LINK in Site → Environment variables.
- Add custom domain in Netlify, update DNS at registrar:
  A @ 75.2.60.5
  A @ 99.83.190.102
  CNAME www -> <your-site>.netlify.app

After payment, set Stripe Payment Link → After payment → Redirect to:
https://<your-domain-or-netlify>.app/success
>>>>>>> bc2b305 (Initial commit of Momentum2025 scaffold)
