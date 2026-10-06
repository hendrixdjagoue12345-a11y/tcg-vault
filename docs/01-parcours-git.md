# Parcours Git

Chaque commit correspond à une étape de réalisation. Pour observer le projet à un jalon donné :

```bash
git log --oneline --reverse
git switch --detach <identifiant-du-commit>
npm ci
npm run dev
```

Pour revenir à la version complète :

```bash
git switch main
```

Ne travaillez pas directement sur un état détaché si vous souhaitez conserver vos modifications. Créez une branche :

```bash
git switch -c mon-experimentation
```

## Correspondance avec le guide PDF

| Étape          | Résultat attendu                                           |
| -------------- | ---------------------------------------------------------- |
| Initialisation | Next.js, TypeScript strict, CSS et commandes npm.          |
| Cadrage        | Promesse, API, routes et critères observables.             |
| Domaine        | Types internes et validation des données externes.         |
| Accès API      | Contrôle HTTP, transformation et politique de cache.       |
| Structure      | Layout, navigation, accueil et composants partagés.        |
| Catalogue      | Recherche, filtre, pagination et paramètres d’URL.         |
| Carte 3D       | Client Component, événements de pointeur et CSS avancé.    |
| Fiche          | Route dynamique, métadonnées, chargement, erreur et 404.   |
| Favoris        | Context, état partagé et persistance avec `localStorage`.  |
| Route Handler  | Contrat HTTP interne réellement consommé côté client.      |
| Server Action  | Formulaire progressif et validation exécutée côté serveur. |
| Tests          | Fonctions pures, composants et parcours navigateur.        |
| Documentation  | Installation, architecture et scénario de démonstration.   |
