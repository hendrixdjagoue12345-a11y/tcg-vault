import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InteractiveCardArtwork } from "@/features/catalog/components/interactive-card-artwork";
import { getCard } from "@/features/catalog/service";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

type CardPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: CardPageProps): Promise<Metadata> {
  const { id } = await params;
  const card = await getCard(id);

  return card
    ? { title: card.name, description: `Découvrez la carte ${card.name}.` }
    : { title: "Carte introuvable" };
}

export default async function CardPage({ params }: CardPageProps) {
  const { id } = await params;
  const card = await getCard(id);

  if (!card) notFound();

  return (
    <main id="main-content" className="container page-section">
      <Link className={styles.back} href="/catalogue">
        ← Retour au catalogue
      </Link>

      <div className={styles.layout}>
        <div className={styles.artwork}>
          <InteractiveCardArtwork
            name={card.name}
            imageUrl={card.imageUrl}
            sizes="(min-width: 56rem) 25rem, 80vw"
            priority
          />
        </div>

        <section className={styles.content}>
          <p className="eyebrow">{card.set.name}</p>
          <h1>{card.name}</h1>
          <p className={styles.lead}>
            {card.description ??
              "Cette carte ne possède pas encore de description dans la source de données."}
          </p>

          <dl className={styles.facts}>
            <div>
              <dt>Catégorie</dt>
              <dd>{card.category}</dd>
            </div>
            <div>
              <dt>Rareté</dt>
              <dd>{card.rarity ?? "Non renseignée"}</dd>
            </div>
            <div>
              <dt>Points de vie</dt>
              <dd>{card.hp ?? "Non applicable"}</dd>
            </div>
            <div>
              <dt>Illustration</dt>
              <dd>{card.illustrator ?? "Auteur non renseigné"}</dd>
            </div>
          </dl>

          {card.types.length > 0 ? (
            <div className={styles.tags} aria-label="Types de la carte">
              {card.types.map((type) => (
                <span key={type}>{type}</span>
              ))}
            </div>
          ) : null}

          {card.attacks.length > 0 ? (
            <section className={styles.attacks} aria-labelledby="attacks-title">
              <h2 id="attacks-title">Attaques</h2>
              {card.attacks.map((attack) => (
                <article key={`${attack.name}-${attack.damage ?? "support"}`}>
                  <div>
                    <h3>{attack.name}</h3>
                    {attack.cost.length > 0 ? (
                      <p>{attack.cost.join(" · ")}</p>
                    ) : null}
                  </div>
                  {attack.damage ? <strong>{attack.damage}</strong> : null}
                  {attack.effect ? <p>{attack.effect}</p> : null}
                </article>
              ))}
            </section>
          ) : null}
        </section>
      </div>
    </main>
  );
}
