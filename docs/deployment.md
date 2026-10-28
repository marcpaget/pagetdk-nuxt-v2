# Staging og production

Kun `dev` (integration/staging) og `main` (production) er permanente branches.
Opret kortlivede `feature/*`, `fix/*` eller `chore/*` branches fra seneste `dev`.

```sh
git switch dev
git pull --ff-only
git switch -c feature/example
# Lav ændringer og commit dem.
git push -u origin feature/example
```

1. Opret PR mod `dev`. CI skal være grøn. Brug **Squash and merge**.
2. Push til `dev` kører CI, bygger/pusher staging-image til GHCR og udløser staging-deployment.
3. Test staging, og opret derefter PR fra `dev` til `main`.
4. Brug **Create a merge commit** til `dev -> main`, så fælles historik bevares.
5. Push til `main` kører CI, bygger/pusher production-image til GHCR og udløser production-deployment.

Squash ikke release-PR'er fra `dev` til `main`. Efter en release synkroniseres
merge-commit tilbage via en kortlivet branch og en PR med **Create a merge commit**:

```sh
git fetch origin
git switch -c chore/sync-main-to-dev origin/dev
git merge origin/main
git push -u origin chore/sync-main-to-dev
# PR: chore/sync-main-to-dev -> dev, vælg Create a merge commit.
```

Det holder næste release-PR up-to-date med `main` uden force pushes. Slet kun
kortlivede branches efter merge; behold altid `dev` og `main`.

## GitHub

Det obligatoriske statuscheck hedder `CI` og kræver succes fra både `Checks`
(install, lint, typecheck, unit tests, build) og `E2E Tests`.
Checks kører på PR'er mod `dev`/`main` og push til de to branches.
Deployment kører kun på push efter grøn CI. Fejl, cancellation eller skipped
checks må ikke give en grøn CI-gate.

Begge branches kræver PR, nul approvals, CI og forbyder force push/sletning,
også for administratorer. `main` kræver desuden up-to-date branch og resolved
conversations. `dev` kræver ikke up-to-date feature-branches.

GitHub environments er case-insensitive: workflowets `staging` og `production`
bruger de eksisterende `Staging` og `Production`. Deres tilladte deployment-
branches er henholdsvis `dev` og `main`.

## Dokploy (manuel opsætning)

Opret to applications med **Docker image** som kilde:

| Environment | Image | Konfiguration |
| --- | --- | --- |
| Staging | `ghcr.io/marcpaget/pagetdk-nuxt-v2:staging` | Staging-domæne og egne runtime-variabler/secrets |
| Production | `ghcr.io/marcpaget/pagetdk-nuxt-v2:production` | Production-domæne og egne runtime-variabler/secrets |

GitHub Actions bygger fra repositoryets `Dockerfile` på en ARM64-runner,
ligesom den tidligere GHCR-pipeline. Dokploy-serveren skal understøtte
`linux/arm64`. Appen lytter på port 3000.

Efter grøn CI på push til `dev`/`main` publiceres både environment-tagget
(`staging`/`production`) og et sporbarheds-tag (`staging-sha-<fuld commit-SHA>` /
`production-sha-<fuld commit-SHA>`). Der publiceres ikke et fælles `latest`.
PR'er kører checks og Nuxt-build, men publicerer ikke images eller deployer.

Dokploy henter det færdige image; der skal ikke køres et nyt build dér.
Slå direkte GitHub/registry Auto Deploy fra. Actions kalder først deployment-
API'et, når image-push er lykkedes. Workflowet serialiserer push-kørsler pr.
branch og afbryder ikke et igangværende deployment ved næste push.

Actions bruger `GITHUB_TOKEN` med `packages: write` til GHCR. Hvis imaget er
privat, skal Dokploy have registry-login til `ghcr.io` med en GitHub-bruger
og et token med `read:packages` og adgang til pakken. Et offentligt repository
gør ikke automatisk container-pakken offentlig.

Appens runtime-variabler sættes separat i Dokploy. Variabler, der bruges ved
build-tid, skal konfigureres i Actions/Docker-buildet; Dokploys runtime-variabler
ændrer ikke allerede genererede statiske filer.

Sæt følgende secrets **separat i hvert GitHub environment**:

| Secret | Værdi |
| --- | --- |
| `DOKPLOY_ENV_API_URL` | `https://<dokploy-host>/api/application.deploy` |
| `DOKPLOY_ENV_API_TOKEN` | Dokploy API-token |
| `DOKPLOY_ENV_APPLICATION_ID` | ID for netop dette environments application |

API-metoden er bevaret fra den eksisterende integration i stedet for det
valgfrie `DOKPLOY_WEBHOOK`. Den virker med direkte Auto Deploy deaktiveret.
De nye `DOKPLOY_ENV_*` navne undgår fallback til de eksisterende
`DOKPLOY_API_*`/`DOKPLOY_APPLICATION_ID` production-secrets på repository-niveau.
Opret kun de nye navne i environments, aldrig som repository-secrets.

Et grønt deployment-job betyder, at Dokploy accepterede anmodningen. Følg
selve image-pull/deployment i Dokploy og test sitet. Dokploy bruger det valgte
environment-tag, som flyttes ved næste succesfulde build. Brug et specifikt
SHA-tag eller image-digest i Dokploy til en fastlåst version eller rollback.
Production bygges fra merge-committet på `main`; det er ikke en direkte
promovering af staging-imagets digest.

Dokumentation: [Dokploy Auto Deploy og API](https://docs.dokploy.com/docs/core/auto-deploy),
[GitHub Actions og GHCR](https://docs.github.com/en/actions/tutorials/publish-packages/publish-docker-images).

## Første indfasning

`dev` blev oprettet direkte fra `main`, uden dummy-commit. Workflowet skal
ind via en rigtig PR til `dev` og derefter release-PR til `main`.
Den gamle `main` har endnu ikke lint/typecheck/test-scripts; den nyere app
findes på `cicd-pipeline`. CI må ikke omgås for at indfase den.
Den nuværende E2E-test er kun en placeholder og verificerer ikke appens UI.
