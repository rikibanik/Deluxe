# Web Frontend

Next.js App Router UI (JavaScript) for authentication, repository browsing, and code viewing.

## Routes

| Path | Page |
|------|------|
| `/` | Dashboard |
| `/login` | Login |
| `/register` | Sign up |
| `/settings/tokens` | PAT management |
| `/:owner/:repo` | Repository home |
| `/:owner/:repo/tree/*` | File browser |
| `/:owner/:repo/commits` | Commit history |

## Run locally

```bash
npm install
npm run dev
```
