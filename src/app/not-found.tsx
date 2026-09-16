import Link from "next/link";

export default function NotFound() {
  return (
    <main className="foundation-shell">
      <p className="foundation-kicker">404</p>
      <h1>This route does not exist.</h1>
      <p className="foundation-copy">
        Return to the current engineering environment.
      </p>
      <Link className="foundation-link" href="/">
        Return home
      </Link>
    </main>
  );
}
