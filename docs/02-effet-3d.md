# Étape 6 — Comprendre l’effet 3D

Le composant `CardTile` est volontairement un Client Component : il réagit aux événements du pointeur. Le catalogue et l’accès aux données restent exécutés sur le serveur.

## Calcul

1. `getBoundingClientRect()` donne la position et la taille de la carte.
2. La position du pointeur est convertie en valeurs comprises entre `0` et `1`.
3. Le centre de la carte correspond à `0.5`.
4. L’écart au centre devient une rotation maximale de 8 degrés verticalement et 10 degrés horizontalement.
5. Les valeurs sont transmises au CSS dans des propriétés personnalisées.

```text
x = (pointerX - left) / width
y = (pointerY - top) / height
rotateY = (x - 0.5) × 20°
rotateX = (0.5 - y) × 16°
```

Mettre à jour directement les variables CSS évite un nouveau rendu React à chaque déplacement. `requestAnimationFrame` regroupe les mises à jour au rythme d’affichage du navigateur.

## Couches visuelles

La carte contient trois couches superposées :

- l’image fournie par TCGdex ;
- un dégradé multicolore utilisant `mix-blend-mode: color-dodge` ;
- un reflet radial centré sur la position du pointeur.

L’effet est décoratif. Les deux couches ont `aria-hidden="true"` et ne capturent pas les événements. La règle `prefers-reduced-motion: reduce` supprime rotation et animation pour respecter la préférence système.
