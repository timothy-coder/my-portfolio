import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <p className="eyebrow">404</p>
        <h1>Página no encontrada</h1>
        <p>La ruta solicitada no existe en Nicolas Portfolio.</p>
        <Button asChild>
          <a href="/">Volver al inicio</a>
        </Button>
      </section>
    </main>
  );
}
