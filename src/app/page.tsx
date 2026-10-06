import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="container hero__grid">
          <SectionHeading
            eyebrow="Projet guide Next.js"
            title="Votre collection commence ici."
          >
            <p>
              Explorez les cartes Pokémon, observez leurs détails et composez
              une sélection qui reste enregistrée dans votre navigateur.
            </p>
            <div className="actions">
              <Link className="button button--primary" href="/catalogue">
                Explorer le catalogue
              </Link>
              <Link className="button button--secondary" href="/favoris">
                Voir mes favoris
              </Link>
            </div>
          </SectionHeading>

          <div className="hero-card" aria-hidden="true">
            <span>TCG</span>
            <strong>VAULT</strong>
            <small>Collection numérique</small>
          </div>
        </div>
      </section>

      <section
        className="container page-section"
        aria-labelledby="project-title"
      >
        <p className="eyebrow">Le projet</p>
        <h2 id="project-title" className="display-title">
          Une API réelle, une interface vivante.
        </h2>
        <div className="feature-grid">
          <article>
            <span>01</span>
            <h3>Rechercher</h3>
            <p>
              Les critères sont conservés dans l’URL et peuvent être partagés.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Observer</h3>
            <p>
              Chaque carte réagit au pointeur avec une profondeur calculée en
              direct.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Conserver</h3>
            <p>
              Les favoris sont partagés entre les écrans et persistent
              localement.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
