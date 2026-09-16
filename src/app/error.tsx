"use client";

export default function GlobalError({
  reset,
}: Readonly<{
  reset: () => void;
}>) {
  return (
    <main className="foundation-shell" role="alert">
      <p className="foundation-kicker">UNEXPECTED ERROR</p>
      <h1>That page could not be rendered.</h1>
      <p className="foundation-copy">
        The error has been contained. You can safely try the page again.
      </p>
      <button className="foundation-link" onClick={reset} type="button">
        Try again
      </button>
    </main>
  );
}
