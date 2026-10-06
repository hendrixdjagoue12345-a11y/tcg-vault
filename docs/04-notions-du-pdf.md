# Correspondance avec les notions du PDF

| Notion                  | Mise en pratique                                                                            | Fichiers principaux                                  |
| ----------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| JSX                     | Conditions, listes, expressions et fragments d’interface.                                   | `card-tile.tsx`, `catalogue/page.tsx`                |
| Composants              | Carte, grille, titre, état vide, navigation et pied de page.                                | `src/components`, `catalog/components`               |
| Props                   | Contrats explicites pour chaque composant.                                                  | `interactive-card-artwork.tsx`                       |
| Cycle de rendu          | Clés stables, mise à jour après événement et absence de mutation.                           | `card-grid.tsx`, `provider.tsx`                      |
| État et événements      | Menu, saisie, favoris et coordonnées du pointeur.                                           | `site-header.tsx`, `quick-search.tsx`                |
| État dérivé et effets   | Ensemble d’identifiants favoris, stockage et requête annulable.                             | `favorites/provider.tsx`, `quick-search.tsx`         |
| TypeScript fondamental  | Types du domaine, unions et paramètres de requête.                                          | `catalog/types.ts`, `catalog/query.ts`               |
| TypeScript avec React   | Props, contexte, événements et états discriminés.                                           | `favorite-button.tsx`, `quick-search.tsx`            |
| App Router              | Layout, pages, route dynamique, 404 et Route Handler.                                       | `src/app`                                            |
| Serveur et client       | Pages serveur et petits îlots interactifs.                                                  | `catalogue/page.tsx`, `interactive-card-artwork.tsx` |
| Chargement des données  | `fetch`, `response.ok`, statuts HTTP et validation du JSON.                                 | `catalog/api.ts`, `catalog/service.ts`               |
| Cache et revalidation   | Cache TCGdex d’une heure et réponse HTTP réutilisable.                                      | `catalog/api.ts`, `api/cartes/route.ts`              |
| États d’interface       | Chargement, erreur, vide, stockage en lecture et 404.                                       | `loading.tsx`, `error.tsx`, `not-found.tsx`          |
| Formulaires             | Recherche GET et préférences avec état de soumission.                                       | `catalog-filters.tsx`, `preference-form.tsx`         |
| Server Actions          | Validation, cookies et revalidation.                                                        | `preferences/actions.ts`                             |
| Route Handlers          | Recherche JSON réellement appelée par le navigateur.                                        | `api/cartes/route.ts`, `quick-search.tsx`            |
| État partagé            | URL pour le catalogue, Context pour les favoris.                                            | `catalog/query.ts`, `favorites/provider.tsx`         |
| Tests                   | Fonctions pures, composant interactif et scénarios navigateur.                              | `tests`                                              |
| Accessibilité           | Labels, focus, lien d’évitement, `aria-pressed`, annonces et mouvement réduit.              | `layout.tsx`, `globals.css`, composants interactifs  |
| Performance et sécurité | Îlots clients limités, images optimisées, validation, secrets serveur et requêtes annulées. | `next.config.ts`, `schemas.ts`, `lib/env.ts`         |

## Les quatre états à ne pas confondre

| État              | Déclenchement                              | Réponse du projet                                                |
| ----------------- | ------------------------------------------ | ---------------------------------------------------------------- |
| Chargement        | Navigation vers le segment catalogue.      | Squelettes dans `catalogue/loading.tsx`.                         |
| Erreur            | API inaccessible ou réponse invalide.      | Frontière `catalogue/error.tsx` et bouton de nouvelle tentative. |
| Résultat vide     | Requête valide ne retournant aucune carte. | `EmptyState` dans la page catalogue.                             |
| Ressource absente | Identifiant de carte inexistant.           | `notFound()` puis `app/not-found.tsx`.                           |
