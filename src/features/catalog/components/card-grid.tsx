import type { CardSummary } from "../types";
import { CardTile } from "./card-tile";
import styles from "./card-grid.module.css";

type CardGridProps = {
  cards: CardSummary[];
};

export function CardGrid({ cards }: CardGridProps) {
  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <CardTile key={card.id} card={card} />
      ))}
    </div>
  );
}
