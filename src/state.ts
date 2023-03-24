export type Site = { name: string; parent: string | null; nav: NavItem[] };
export type NavItem = { id: number; title: string; children: NavItem[] };

let _nextItemKey = -1;
export function nextItemId(): number {
  return _nextItemKey--;
}

async function loadState(): Promise<Site | null> {
  const searchKey = "site";
  const qs = new URLSearchParams(window.location.search);
  const siteKey = qs.get(searchKey);
  if (siteKey == null) return null;

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
    parent: "Menu playground",
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
