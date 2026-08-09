const { execFileSync } = require("child_process");
const fs = require("fs");
const posts = [
  ["kongress-resilienz", "https://www.jessica-bisetto.de/post/kongress-von-der-krise-zur-st%C3%A4rke-resilienz-in-der-p%C3%A4dagogischen-arbeit"],
  ["emdr", "https://www.jessica-bisetto.de/post/emdr-die-l%C3%B6sung-bei-trauma-und-emotional-belastenden-themen"],
  ["gefuehlsregulation", "https://www.jessica-bisetto.de/post/gef%C3%BChlsregulation-bei-kindern-wie-sie-ihre-emotionen-besser-verstehen-und-steuern-k%C3%B6nnen"],
  ["motivation", "https://www.jessica-bisetto.de/post/neues-aus-der-welt-der-motivation"],
  ["feine-antennen", "https://www.jessica-bisetto.de/post/feine-antennen-warum-wir-unseren-kindern-nichts-vormachen-sollten"],
  ["corona", "https://www.jessica-bisetto.de/post/unsere-kinder-und-corona"],
  ["muecken", "https://www.jessica-bisetto.de/post/m%C3%BCcken-abwehren"],
  ["orientierungslos", "https://www.jessica-bisetto.de/post/orientierungslose-was-nun"],
  ["schluessel-erfolg", "https://www.jessica-bisetto.de/post/schl%C3%BCssel-zum-erfolg"],
  ["respekt", "https://www.jessica-bisetto.de/post/vortrag-%C3%BCber-respekt-und-kommunikation"],
];
for (const [slug, url] of posts) {
  try {
    const out = execFileSync("node", ["tools/wix-extract.cjs", url], { encoding: "utf8", maxBuffer: 20e6 });
    fs.writeFileSync(`wix_export/${slug}.json`, out);
    const d = JSON.parse(out);
    console.log(slug.padEnd(22), "|", (d.blocks||[]).length, "Blöcke |", (d.media||[]).length, "Medien |", d.error||"ok");
  } catch (e) { console.log(slug, "FEHLER:", e.message.slice(0,80)); }
}
