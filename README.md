# TCG Vault

TCG Vault est la version guidée du TP Next.js consacré aux API publiques. Vous explorez des cartes Pokémon, ouvrez une fiche détaillée, composez une sélection locale et observez un effet holographique qui suit précisément le pointeur.

Le projet utilise [TCGdex](https://tcgdex.dev/), une API gratuite et sans clé. Le code suit le parcours du PDF : TypeScript strict, validation des données externes, Server Components, Client Components ciblés, App Router, cache, états d’interface, Route Handler, Server Action, tests et CSS responsive écrit sans framework.

## Démarrer

Prérequis : Node.js 22.12 ou une version LTS plus récente compatible, npm et une connexion à Internet pour consulter TCGdex.

```bash
npm ci
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000). Aucune clé API et aucun fichier `.env` ne sont nécessaires. Copiez `.env.example` uniquement si vous souhaitez changer la langue ou l’URL du service.

## Parcours fonctionnel

| Route                | Ce que vous pouvez observer                                                       |
| -------------------- | --------------------------------------------------------------------------------- |
| `/`                  | Hero responsive, sélections mises en avant et recherche client via Route Handler. |
| `/catalogue`         | Formulaire GET, paramètres d’URL, filtre par catégorie et pagination.             |
| `/catalogue/[id]`    | Route dynamique, métadonnées, données détaillées et véritable 404.                |
| `/favoris`           | Context React, état partagé et persistance avec `localStorage`.                   |
| `/preferences`       | Formulaire progressif, `useActionState`, validation serveur et cookies.           |
| `/api/cartes?q=pika` | Contrat HTTP JSON avec statuts 200, 400 et 502.                                   |

Survolez une carte avec la souris : l’inclinaison, l’ombre et le reflet utilisent la position réelle du pointeur. L’effet est supprimé si le système demande une réduction des animations.

## Rejouer la réalisation commit par commit

L’historique Git est volontairement inclus dans l’archive. Chaque commit correspond à une étape pédagogique autonome.

```bash
git log --oneline --reverse
git show <identifiant-du-commit>
git switch --detach <identifiant-du-commit>
```

Revenez ensuite à la version finale :

```bash
git switch main
```

Le détail du parcours se trouve dans [docs/01-parcours-git.md](docs/01-parcours-git.md).

## Lire le projet

| Document                                    | Utilité                                              |
| ------------------------------------------- | ---------------------------------------------------- |
| [Cadrage](docs/00-cadrage.md)               | Promesse, endpoints, écrans et critères observables. |
| [Parcours Git](docs/01-parcours-git.md)     | Progression correspondant aux commits.               |
| [Effet 3D](docs/02-effet-3d.md)             | Calcul des rotations et composition visuelle.        |
| [Architecture](docs/03-architecture.md)     | Arborescence et responsabilités des dossiers.        |
| [Notions du PDF](docs/04-notions-du-pdf.md) | Notion → fonctionnalité → fichier à observer.        |
| [Contrats HTTP](docs/05-api-et-cache.md)    | API externe, Route Handler, erreurs et cache.        |
| [Vérification](docs/06-verification.md)     | Commandes, tests et scénario manuel.                 |

Commencez par `src/app/catalogue/page.tsx`, suivez l’appel vers `src/features/catalog/service.ts`, puis observez la frontière avec TCGdex dans `api.ts`. Pour l’interactivité, ouvrez `interactive-card-artwork.tsx`, puis `features/favorites/provider.tsx`.

## Vérifier

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

La commande suivante enchaîne ces quatre contrôles :

```bash
npm run verify
```

Pour les tests navigateur :

```bash
npx playwright install chromium
npm run test:e2e
```

## Choix techniques

Next.js 16 avec App Router, React 19, TypeScript strict, Zod, CSS mobile first, CSS Modules, Vitest, Testing Library et Playwright. Les versions exactes sont verrouillées dans `package-lock.json`.

Les images et informations des cartes restent la propriété de leurs ayants droit. TCG Vault est un projet pédagogique sans usage commercial.

Propriété de Julien Grade.
