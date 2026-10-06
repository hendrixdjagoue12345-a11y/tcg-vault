# Architecture du projet

## Arborescence utile

```text
src/
├── app/
│   ├── api/cartes/route.ts
│   ├── catalogue/[id]/page.tsx
│   ├── catalogue/error.tsx
│   ├── catalogue/loading.tsx
│   ├── catalogue/page.tsx
│   ├── favoris/page.tsx
│   ├── preferences/page.tsx
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── shell/
│   └── ui/
├── features/
│   ├── catalog/
│   │   ├── components/
│   │   ├── api.ts
│   │   ├── mappers.ts
│   │   ├── query.ts
│   │   ├── schemas.ts
│   │   ├── service.ts
│   │   └── types.ts
│   ├── favorites/
│   └── preferences/
└── lib/env.ts
```

## Sens des dépendances

La page connaît la route et ses paramètres. Elle appelle le service et transmet des modèles internes aux composants. Le service valide puis transforme le JSON de l’API. Seul `api.ts` construit l’URL externe et exécute `fetch`.

```text
Page serveur → Service → Client TCGdex → API externe
      ↓           ↓
 Composants   Schémas + mappers
```

Cette séparation empêche le format TCGdex de se répandre dans l’interface. Si le fournisseur renomme `image`, seul le schéma ou le mapper change.

## Serveur et client

Les pages restent des Server Components par défaut. Les fichiers portant `"use client"` correspondent à une interaction qui nécessite le navigateur : menu mobile, mouvement du pointeur, favoris, recherche instantanée, formulaire avec état de soumission et frontière d’erreur.

Les modules `api.ts`, `service.ts` et `lib/env.ts` importent `server-only`. Une erreur de compilation apparaît si un composant client tente de les embarquer.

## CSS

`globals.css` définit les couleurs, les éléments génériques et les motifs réellement globaux. Chaque composant complexe conserve son CSS Module à proximité. Les media queries partent de la petite largeur et enrichissent progressivement la disposition.

Les valeurs de taille sont relatives (`rem`, `%`, `vw`, `clamp`) à l’exception des coordonnées calculées en pixels à partir du pointeur pour l’ombre dynamique.
