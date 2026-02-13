# Deployment Procedures

This guide outlines the steps required to deploy the "Alliance for Community Wellness" application to a production environment.

## Prerequisites
- [ ] Access to the production Supabase project.
- [ ] Environment variables configured in the CI/CD pipeline or hosting platform (e.g., Vercel, Netlify).
- [ ] Production Paystack/PesaPal API keys.

## Environment Variables
Ensure the following variables are set:
- `VITE_SUPABASE_URL`: Production Supabase URL.
- `VITE_SUPABASE_ANON_KEY`: Production Supabase Anon Key.
- `VITE_PAYSTACK_PUBLIC_KEY`: Production Paystack Public Key.
- `VITE_PESAPAL_CONSUMER_KEY`: Production PesaPal Consumer Key (if applicable).
- `VITE_PESAPAL_CONSUMER_SECRET`: Production PesaPal Consumer Secret (if applicable).

## Deployment Steps

### 1. Build and Validate
Run the following commands locally or in the CI to ensure code quality:
```bash
# Type check
npx tsc --noEmit
# Lint
npm run lint
# Production Build
npm run build
```

### 2. Database Migrations
Verify that the production Supabase database has the required tables and RLS policies:
- `contact_submissions`
- `volunteer_applications`
- `donations`
- `profiles` (for admin access)

### 3. Edge Functions (if using PesaPal)
Deploy the Supabase Edge Functions for PesaPal integration:
```bash
supabase functions deploy pesapal-pay
```

### 4. Hosting Configuration
Deploy the contents of the `dist/` directory to your web server or hosting provider.

## Post-Deployment Verification
- [ ] Verify SSL certificate is active.
- [ ] Test Contact Form submission.
- [ ] Test Volunteer Application submission.
- [ ] Perform a small test donation to verify payment integration.
- [ ] Log in to the Admin Dashboard to verify backend data access.
