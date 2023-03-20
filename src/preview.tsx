import { Message, Site } from "./state";
import { MenuItem } from "./menu-item";
import { Link } from "./link";
import { signal } from "@preact/signals";

type State =
  | {
      loading: true;
    }
  | {
      loading: false;
      site: Site;
    };

const state = signal<State>({ loading: true });

window.addEventListener("message", ({ data }: MessageEvent<Message>) => {
  if (data.type == "update") {
    state.value = {
      loading: false,
      site: data.site,
    };
  }
});

const refreshMessage: Message = { type: "refresh" };
window.parent.postMessage(refreshMessage);

export function Preview() {
  if (state.value.loading) {
    return <div>Loading...</div>;
  }

  const { site } = state.value;

  return (
    <div class="dialog-off-canvas-main-canvas" data-off-canvas-main-canvas>
      <header role="banner" class="masthead">
        <div class="container-masthead">
          <div class="row">
            <div class="col-md-7 col-lg-8" style="padding-right: 45px">
              <Link href="https://www.ed.ac.uk">
                <img
                  class="masthead-logo"
                  src="https://www-test.uwp.is.ed.ac.uk/jo/wpp_megamenu_prototype/images/logo.png"
                  alt="The University of Edinburgh"
                />
              </Link>
            </div>

            <div class="col-md-5 col-lg-4">
              <div class="masthead-text">
                <ul class="list-inline">
                  <li class="list-inline-item">
                    <Link href="https://www.ed.ac.uk/schools-departments">
                      Schools &amp; departments
                    </Link>
                  </li>
                  <li class="list-inline-item">
                    <Link href="https://www.myed.ed.ac.uk/">MyEd</Link>
                  </li>
                </ul>
              </div>
              <div role="search" class="masthead-search">
                <form
                  action="https://search.ed.ac.uk/"
                  method="get"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div class="input-group input-group-lg">
                    <input
                      type="search"
                      aria-label="Input your search term"
                      placeholder="Search"
                      class="form-control"
                      data-bs-items="4"
                      data-provide="uoe-search"
                      name="q"
                      autocomplete="off"
                      spellcheck={true}
                      dir="auto"
                    />
                    <button class="btn btn-search" type="submit">
                      <span class="visually-hidden">Submit search</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid beta-container">
          <div class="container">
            <div class="beta-banner">
              <div class="badge bg-brand">PREVIEW</div>
              <div>
                Use this tool to experiment with menu titles. This will not change your real site.
              </div>
            </div>
          </div>
        </div>
        <div class="masthead-hero">
          <div class="masthead-title">
            <span class="h1">
              <Link href="/">{site.name}</Link>
            </span>
            <span class="h2">
              <Link href="https://www.ed.ac.uk/information-services">Menu Playground</Link>
            </span>
          </div>
        </div>
      </header>

      <nav class="uoe-nav navbar navbar-expand-lg py-0" aria-label="Content navigation">
        <div class="container-fluid navbar-light bg-white uoe-mega-menu">
          <div class="container container-nav">
            <button
              class="navbar-toggler float-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
              <span class="visually-hidden">Toggle Navigation</span> Menu
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto ps-lg-0 flex-wrap">
                {site.nav.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
