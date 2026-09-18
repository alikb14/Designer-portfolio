// Test-process-only transport: never imported by application code or deployment.
const originalFetch = globalThis.fetch;
globalThis.fetch = async function (input, init) {
  const url = new URL(typeof input === "string" ? input : (input.url ?? input));
  if (/^fixture1\.(?:api|apicdn)\.sanity\.io$/.test(url.hostname)) {
    const query = url.searchParams.get("query") ?? "";
    const result = query.includes('"playItem"')
      ? Array.from({ length: 7 }, (_, index) => ({
          _id: `play-${index + 1}`,
          title: `Motion study ${index + 1}`,
          description:
            "A motion study with project files and a detailed explanation. "
              .repeat(5)
              .trim(),
          downloadUrl:
            index === 0
              ? "https://cdn.sanity.io/files/fixture1/testing/sample.zip"
              : undefined,
        }))
      : query.includes('"workProject"')
        ? []
        : null;
    return Response.json({ result, query, ms: 1 });
  }
  return originalFetch(input, init);
};
