# StudentReady

Practical guidance for supporting the whole student.

This repository contains the standalone StudentReady website prepared for
Cloudflare Workers deployment through GitHub. It does not collect student
names, profiles, identifiers, or case records.

## Local setup

Requirements:

- Node.js 22.13 or newer
- npm

Run:

```bash
npm ci
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Publish the repository to GitHub

1. Create a new empty GitHub repository named `studentready`.
2. Upload all files from this package to the repository root.
3. Commit the files to the `main` branch.

Do not upload `node_modules`, `dist`, `.env` files, or Wrangler login files.
They are already excluded by `.gitignore`.

## Connect GitHub to Cloudflare

1. In Cloudflare, open **Workers & Pages**.
2. Select **Create application**.
3. Choose **Import a repository**.
4. Connect GitHub and select the `studentready` repository.
5. Set the Worker name to `studentready`.
6. Use `main` as the production branch.
7. Use `npm run build` as the build command.
8. Use `npm run deploy` as the deploy command.
9. Save and deploy.

The Worker name must match the `name` value in `wrangler.jsonc`.

## Connect studentready.cc

After the first successful Worker deployment:

1. Open the `studentready` Worker in Cloudflare.
2. Go to **Settings > Domains & Routes**.
3. Select **Add > Custom Domain**.
4. Enter `studentready.cc` and confirm.
5. Repeat with `www.studentready.cc` if you want both addresses.

Cloudflare will create the required DNS record when the domain is active in
the same Cloudflare account. Remove a conflicting CNAME record before adding a
Worker Custom Domain.

## Automatic updates

Every push to the connected `main` branch will rebuild and deploy the website.

## Useful commands

```bash
npm run dev       # Local development
npm run build     # Production build
npm run deploy    # Deploy with Wrangler
npm run lint      # Code checks
```
