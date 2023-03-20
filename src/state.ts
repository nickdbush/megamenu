export type Site = { name: string; nav: NavItem[] };
export type NavItem = { id: number; title: string; children: NavItem[] };

let _nextItemKey = -1;
export function nextItemId(): number {
  return _nextItemKey--;
}

async function loadState(): Promise<Site | null> {
  const searchKey = "site";
  const qs = new URLSearchParams(window.location.search);
  const siteKeyRaw = qs.get(searchKey);
  if (siteKeyRaw == null) return null;

  let siteKey: number;
  try {
    siteKey = parseInt(siteKeyRaw);
  } catch (err) {
    console.error(`Site key "${siteKeyRaw}" could not be parsed`);
    return null;
  }
  if (siteKey < 0 || siteKey > 167) {
    console.error(`Site key ${siteKey} out of bounds`);
    return null;
  }

  const response = await fetch(`/sitemaps/sitemap-${siteKey}.json`);
  if (response.status == 404) {
    console.error(`Site for key ${siteKey} not found`);
    return null;
  }
  const site: Site = await response.json();
  return site;
}

export async function load(): Promise<Site> {
  const state = await loadState();
  if (state != null) {
    return state;
  }

  return {
    name: "Example site",
    nav: [
      { id: nextItemId(), title: "Home", children: [] },
      { id: nextItemId(), title: "Contact", children: [] },
      {
        id: nextItemId(),
        title: "News",
        children: [
          { id: nextItemId(), title: "Example 1", children: [] },
          { id: nextItemId(), title: "Example 2", children: [] },
        ],
      },
    ],
  };
}

export type Message =
  | {
      type: "update";
      site: Site;
    }
  | { type: "refresh" };
