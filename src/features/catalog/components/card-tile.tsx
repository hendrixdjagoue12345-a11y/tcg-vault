import Link from "next/link";
import type { CardSummary } from "../types";
import { InteractiveCardArtwork } from "./interactive-card-artwork";
import styles from "./card-tile.module.css";

type CardTileProps = {
  card: CardSummary;
};

export function CardTile({ card }: CardTileProps) {
  return (
    <article className={styles.tile}>
      <Link href={`/catalogue/${card.id}`} className={styles.link}>
        <InteractiveCardArtwork
          name={card.name}
          imageUrl={card.imageUrl}
          sizes="(min-width: 68rem) 16rem, (min-width: 44rem) 30vw, 45vw"
        />
        <div className={styles.content}>
          <p>Carte nº {card.localId}</p>
          <h2>{card.name}</h2>
          <span>Voir la fiche</span>
        </div>
      </Link>
    </article>
  );
}
