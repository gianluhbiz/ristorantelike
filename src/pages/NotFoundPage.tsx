import TransitionLink from "../components/ui/TransitionLink";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[80svh] flex-col items-center justify-center gap-6 px-4 pt-24 text-center">
      <span className="grid size-20 place-items-center rounded-full bg-shu font-display text-4xl font-bold text-white">
        可
      </span>
      <h1 className="font-display text-5xl font-bold">Questa pagina non c'è</h1>
      <p className="max-w-sm text-rice/65">Il link potrebbe essere vecchio. Il menu e la home sono a un clic.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <TransitionLink
          to="/"
          className="rounded-full bg-shu px-6 py-3.5 font-semibold text-white transition-transform duration-150 active:scale-[0.97]"
        >
          Torna alla home
        </TransitionLink>
        <TransitionLink
          to="/menu"
          className="rounded-full border border-rice/20 px-6 py-3.5 font-semibold transition-transform duration-150 active:scale-[0.97]"
        >
          Il menu
        </TransitionLink>
      </div>
    </main>
  );
}
