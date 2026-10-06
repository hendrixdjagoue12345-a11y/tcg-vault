# API, contrats HTTP et cache

## TCGdex

Le client externe utilise la base `https://api.tcgdex.net/v2/fr`. La langue et la base peuvent être remplacées avec les variables documentées dans `.env.example`.

`fetchTcgdex` exige une réponse HTTP réussie avant de lire le JSON. Le service reçoit ensuite `unknown`, le valide avec Zod et transforme les DTO en modèles internes.

## Politique de cache

Les données de cartes changent peu. Les requêtes externes utilisent `next.revalidate = 3600`, soit une heure. Ce choix réduit la charge sur l’API publique tout en conservant une fraîcheur raisonnable.

Les pages du catalogue sont rendues dynamiquement parce qu’elles dépendent des paramètres d’URL. Le cache de données reste actif : rendu dynamique ne signifie pas absence de cache pour `fetch`.

## Route interne

```http
GET /api/cartes?q=pika
Accept: application/json
```

Réponse valide :

```json
{
  "data": [
    {
      "id": "basep-1",
      "localId": "1",
      "name": "Pikachu",
      "imageUrl": "https://assets.tcgdex.net/.../high.webp"
    }
  ]
}
```

| Statut | Signification                                                            |
| ------ | ------------------------------------------------------------------------ |
| `200`  | Recherche exécutée. Le tableau peut être vide.                           |
| `400`  | Le paramètre `q` contient moins de deux caractères.                      |
| `502`  | Le service externe ou sa réponse ne permet pas de terminer la recherche. |

Le composant `QuickSearch` vérifie lui aussi le contrat JSON. Une route interne reste une frontière de données et ne doit pas être considérée comme fiable uniquement parce qu’elle appartient au projet.

## Sécurité

Les valeurs de recherche sont limitées avant l’appel externe et encodées avec `URLSearchParams`. Les identifiants de route sont encodés. Les variables serveur ne sont jamais importées dans un Client Component. Les erreurs techniques complètes ne sont pas renvoyées au navigateur.
