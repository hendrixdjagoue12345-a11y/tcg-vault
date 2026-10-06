import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main id="main-content" className="container page-section">
      <section className="empty-state">
        <p className="eyebrow">Erreur 404</p>
        <h1>Cette carte reste introuvable.</h1>
        <p>
          Son identifiant est peut-être incorrect ou la ressource a été retirée.
        </p>
        <div className="empty-state__action">
          <Link className="button button--primary" href="/catalogue">
            Revenir au catalogue
          </Link>
        </div>
      </section>
    </main>
  );
}
