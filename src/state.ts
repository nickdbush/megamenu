export type Site = { name: string; nav: NavItem[] };
export type NavItem = { key: any; title: string; children: NavItem[] };

type SiteResponse = { name: string; root: string; nav: NavItemResponse[] };
type NavItemResponse = { title: string; children: NavItemResponse[] };

function transformSite(site: SiteResponse): Site {
  return {
    name: site.name,
    nav: site.nav.map(transformItem),
  };
}

function transformItem(item: NavItemResponse): NavItem {
  return {
    key: nextItemKey(),
    title: item.title,
    children: item.children.map(transformItem),
  };
}

let _nextItemKey = 0;
function nextItemKey(): number {
  return _nextItemKey++;
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
  const rawSite: SiteResponse = await response.json();
  return transformSite(rawSite);
}

export async function load(): Promise<Site> {
  const state = await loadState();
  if (state != null) {
    return state;
  }

  return {
    name: "Example site",
    nav: [
      { key: nextItemKey(), title: "Home", children: [] },
      { key: nextItemKey(), title: "Contact", children: [] },
      {
        key: nextItemKey(),
        title: "News",
        children: [
          { key: nextItemKey(), title: "Example", children: [] },
          { key: nextItemKey(), title: "Example", children: [] },
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
