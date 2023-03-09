# [Megamenu Previewer](https://wpp-menu.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/a56caa6e-d74c-4ed1-aa81-db04db259a58/deploy-status)](https://app.netlify.com/sites/wpp-menu/deploys)

[Open previewer](https://wpp-menu.netlify.app/).

This app provides a quick and dirty preview of how various sitemaps will render with the new megamenu navigation pattern available for migrating EdWeb sites.

## Usage

The site is accessed through the root `/index.html` page. To preview the menu of a specific site, append the migration ID as a query parameter to the root URL.

- `/` (default playground with example content)
- `/?site={ID}` (playground for site with specific migration ID)

The site ID is used to load its specific sitemap. Each individual sitemap is loaded from `/sitemaps/sitemap-{ID}.json`. These are copied directly from the `/public` folder in this repository into the final build.

Each `sitemap-{ID}.json` file follows a simple schema, expressed here as TypeScript types:

```ts
type Sitemap = {
  name: string;
  nav: NavItem[];
};

type NavItem = {
  title: string;
  children: NavItem[];
};
```

## Development

| Tool                                                      | Purpose                               |
| --------------------------------------------------------- | ------------------------------------- |
| [Preact](https://preactjs.com/)                           | UI Framework                          |
| [Preact Signals](https://preactjs.com/guide/v10/signals/) | State management                      |
| [Vite](https://vitejs.dev/)                               | Bundler and development server        |
| [TypeScript](https://www.typescriptlang.org/)             | Type safe development and refactoring |

The app consists of two separate entrypoints:

- `/index.html` (public editor interface)
- `/preview.html` (preview host)

The menus are previewed within the public editor interface by loading the preview host in an iframe. When the preview host has been loaded, any changes to the menu state are propgated to the preview via `window.postMessage()`.

The preview and editor are purposefully rendered within individual browsing contexts to prevent conflicts between global state, styles and scripts. This allows the preview host to link against EdGel and Bootstrap without influencing the style of the editor.

To launch the hot-reload development server, run:

```
npm run dev
```

## Deployment

The app is a static site, meaning there is no server to run. To build the static site, run:

```
npm run build
```

This builds and optimises the site and produces files in the `/dist` folder. All files in this folder must be published in order for the site to work.
