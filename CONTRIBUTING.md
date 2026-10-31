# Contributing

Use Node.js 22.14+ and pnpm 10.7.1.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Pull requests

1. Fork the repository if you do not have write access.
2. Create a branch from the latest `develop`, such as `fix/project-links`.
3. Keep changes focused and preserve the existing MIT license and attribution.
4. Run `pnpm lint` and `pnpm build`. Check affected pages on desktop and mobile for UI changes.
5. Open a pull request targeting `develop` and describe the change and validation.

Changes to `develop` and `main` require a pull request, a passing **Lint and build** check,
and resolved review conversations. Another person's approval is not required;
maintainers can merge their own pull requests. Force pushes and branch deletion
are blocked on both branches. `develop` is the default branch for development PRs.

## Releases

When the accumulated changes in `develop` are ready to publish, open a release
pull request from `develop` into `main`. Merge it after CI passes and the changes
have been checked. Use **Create a merge commit** for release PRs so the shared
history between these long-lived branches is preserved; do not delete `develop`.

For urgent production fixes, branch from `main`, open a PR into `main`, then
merge `main` back into `develop` through a PR so both branches include the fix.

Cloudflare deploys changes merged into `main` to https://bettercatanduanes.org.
The CI workflow validates pull requests without deployment credentials.

## Credentials and data

Keep local settings in `.env.local`; use `.env.example` for placeholders only.
Never commit passwords, API tokens, private keys, or private personal data.
Variables prefixed with `VITE_` are included in the public browser build and
must not contain secrets.
