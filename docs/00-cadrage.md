# Étape 1 — Cadrer le sujet avant de coder

## Promesse

TCG Vault permet de rechercher des cartes Pokémon, de consulter leurs informations et de conserver une sélection personnelle dans le navigateur. L’interface met l’illustration au centre avec une interaction 3D qui évoque une carte physique et son reflet holographique.

## Source de données

Le projet utilise [TCGdex](https://tcgdex.dev/), une API publique consacrée aux cartes Pokémon TCG.

| Besoin | Endpoint |
| --- | --- |
| Catalogue | `GET https://api.tcgdex.net/v2/fr/cards` |
| Recherche | `GET /v2/fr/cards?name=pikachu` |
| Catégorie | `GET /v2/fr/cards?category=Pokemon` |
| Pagination | `pagination:page` et `pagination:itemsPerPage` |
| Fiche | `GET https://api.tcgdex.net/v2/fr/cards/{id}` |

L’API ne demande pas de clé. Les réponses doivent toutefois être mises en cache et le nombre d’appels doit rester raisonnable.

## Écrans retenus

| Route | Responsabilité |
| --- | --- |
| `/` | Présenter le projet et mettre quelques cartes en avant. |
| `/catalogue` | Rechercher, filtrer et paginer les cartes. |
| `/catalogue/[id]` | Montrer les informations détaillées d’une carte. |
| `/favoris` | Afficher la sélection persistée dans le navigateur. |
| `/preferences` | Démontrer un formulaire et une Server Action. |
| `/api/cartes` | Démontrer un Route Handler consommé côté client. |

## Critères observables

1. Une recherche et un filtre sont conservés dans l’URL.
2. Une ressource inconnue affiche une vraie page 404.
3. Chargement, erreur réseau, résultat vide et image absente sont différenciés.
4. Une carte favorite reste présente après rechargement de la page.
5. L’effet 3D suit précisément le pointeur, reste utilisable au clavier et disparaît si l’utilisateur préfère réduire les animations.
6. Le projet fonctionne de la petite largeur au grand écran.

## Hors périmètre

Le projet ne comporte ni compte utilisateur, ni paiement, ni base de données. Les prix de marché ne sont pas utilisés, car leur couverture peut être incomplète. Les favoris sont une préférence locale, pas une collection synchronisée entre plusieurs appareils.
