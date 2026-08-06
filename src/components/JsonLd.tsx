/**
 * Renders JSON-LD into the document.
 *
 * `<` is escaped so a stray `</script>` inside any data string cannot break out
 * of the script element. Next's `<Script>` component is deliberately not used —
 * structured data must be present in the server-rendered HTML, not injected
 * after hydration, or crawlers that do not execute JS will miss it.
 */
export function JsonLd({ schema }: { schema: Record<string, unknown> | Record<string, unknown>[] }) {
  const payload = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}
