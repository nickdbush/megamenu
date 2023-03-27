import { readdirSync, readFileSync, writeFileSync } from "fs";

const sitemaps = readdirSync("public/sitemaps")
  .map((file) => ({
    key: file.slice("sitemap-".length, -".json".length),
    data: JSON.parse(readFileSync(`public/sitemaps/${file}`, "utf8")),
  }))
  .sort((a, b) => {
    const [a1, a2] = a.key.split("-").map((x) => parseInt(x));
    const [b1, b2] = b.key.split("-").map((x) => parseInt(x));
    if (a1 - b1 != 0) {
      return a1 - b1;
    }
    return a2 - b2;
  });

const rows = sitemaps.map(({ key, data }) => {
  const cells = [`<a href="/?site=${key}">${key}</a>`, data.name, data.parent ?? ""];
  return `<tr>${row(cells)}</tr>`;
});

const header = row(["Key", "Name", "Parent"]);
const table = `<table><thead>${header}</thead><tbody>${rows.join("")}</tbody></table>`;
const page = `<!DOCTYPE html><html><body>${table}</body></html>`;
writeFileSync("public/manifest.html", page, "utf8");

function row(cells) {
  return "<tr>" + cells.map((cell) => `<td>${cell}</td>`).join("") + "</tr>";
}
