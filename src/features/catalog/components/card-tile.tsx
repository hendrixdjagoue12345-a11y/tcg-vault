import Image from "next/image";
import Link from "next/link";
import type { CardSummary } from "../types";
import styles from "./card-tile.module.css";

type CardTileProps = {
  card: CardSummary;
};

export function CardTile({ card }: CardTileProps) {
  return (
    <article className={styles.tile}>
      <Link href={`/catalogue/${card.id}`} className={styles.link}>
        <div className={styles.visual}>
          {card.imageUrl ? (
            <Image
              src={card.imageUrl}
              alt={`Carte ${card.name}`}
              fill
              sizes="(min-width: 68rem) 16rem, (min-width: 44rem) 30vw, 45vw"
              className={styles.image}
            />
          ) : (
            <div className={styles.placeholder}>
              <span aria-hidden="true">TCG</span>
              <strong>Visuel indisponible</strong>
            </div>
          )}
        </div>
        <div className={styles.content}>
          <p>Carte nº {card.localId}</p>
          <h2>{card.name}</h2>
          <span>Voir la fiche</span>
        </div>
      </Link>
    </article>
  );
}
