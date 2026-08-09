// Liest einen Wix-Blogbeitrag aus und gibt Struktur (Überschriften, Absätze,
// Listenpunkte) sowie die verwendeten Wix-Medien zurück.
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

function decode(s) {
  return s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&auml;/g, "ä").replace(/&ouml;/g, "ö").replace(/&uuml;/g, "ü")
    .replace(/&Auml;/g, "Ä").replace(/&Ouml;/g, "Ö").replace(/&Uuml;/g, "Ü")
    .replace(/&szlig;/g, "ß").replace(/&hellip;/g, "…")
    .replace(/&#x27;/g, "'")
    .replace(/&bdquo;/g, "„").replace(/&ldquo;/g, "“").replace(/&rdquo;/g, "”")
    .replace(/&lsquo;/g, "‚").replace(/&rsquo;/g, "’")
    .replace(/&ndash;/g, "–").replace(/&mdash;/g, "—")
    .replace(/[ \t]+/g, " ")
    .trim();
}

async function extract(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const html = await res.text();

  // Der Beitragsinhalt steckt im Rich-Content-Viewer (data-hook="rcv-block…").
  const first = html.indexOf('data-hook="rcv-block-first"');
  const lastIdx = html.lastIndexOf("rcv-block");
  if (first === -1 || lastIdx <= first)
    return { url, error: "Inhaltsbereich nicht gefunden" };
  const region = html.slice(first, lastIdx + 4000);

  const blocks = [];
  const re = /<(h2|h3|h4|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  const seen = new Set();
  while ((m = re.exec(region))) {
    const tag = m[1].toLowerCase();
    const text = decode(m[2]);
    if (!text) continue;
    // Wix verschachtelt <p> in <li>; doppelte Texte überspringen
    if (seen.has(text)) continue;
    seen.add(text);
    blocks.push({ tag, text });
  }

  const media = [
    ...new Set(
      [...region.matchAll(/static\.wixstatic\.com\/media\/([^/"'\\?\s]+)/g)].map(
        (x) => x[1]
      )
    ),
  ];

  const title =
    (html.match(/<meta property="og:title" content="([^"]*)"/) || [])[1] || "";

  return { url, title: decode(title), blocks, media };
}

(async () => {
  const url = process.argv[2];
  const out = await extract(url);
  console.log(JSON.stringify(out, null, 1));
})();
