# Vérifier et présenter le projet

## Contrôles automatisés

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

`npm run verify` exécute ces commandes dans cet ordre. Le build ne remplace pas le lint dans Next.js 16.

Les tests Vitest couvrent la normalisation des paramètres, les mappers, la lecture défensive de `localStorage` et l’interaction du bouton favori. Les scénarios Playwright vérifient l’accueil, la Server Action et la suppression d’un favori persistant.

## Scénario manuel commun au PDF

1. Ouvrez le catalogue et recherchez `Pikachu`.
2. Choisissez la catégorie Pokémon et vérifiez que `q` et `category` figurent dans l’URL.
3. Déplacez lentement la souris sur une carte et observez la rotation, l’ombre et le reflet.
4. Ouvrez la fiche puis ajoutez la carte aux favoris.
5. Rechargez la page et ouvrez `/favoris` : la carte doit être conservée.
6. Retirez-la depuis la collection et vérifiez l’état vide.
7. Saisissez deux caractères dans la recherche rapide de l’accueil et observez `/api/cartes` dans l’onglet Réseau.
8. Enregistrez les préférences puis inspectez les cookies.
9. Ouvrez `/catalogue/identifiant-inexistant` et vérifiez la page 404.

## Vérifications responsive et accessibilité

Testez environ 320, 768 et 1280 pixels de large. Parcourez le menu, le formulaire, les cartes et les favoris uniquement avec Tabulation et Entrée. Activez la préférence système de réduction des animations : les cartes ne doivent plus s’incliner.

## Audit des dépendances

```bash
npm run audit:runtime
npm audit
```

La première commande cible les dépendances exécutées en production. N’utilisez pas `npm audit fix --force` sans analyser les changements majeurs proposés.

Sur la version livrée, `npm run audit:runtime` ne remonte aucune vulnérabilité. L’audit complet signale cinq alertes élevées provenant de `braces` via la chaîne d’outils ESLint de Next.js. La correction forcée proposée rétrograderait `eslint-config-next` vers une version majeure incompatible ; elle n’est donc pas appliquée. Ces alertes concernent l’environnement de développement et non les dépendances embarquées par l’application en production.
