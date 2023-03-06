import { useEffect, useState } from "preact/hooks";
import { Message, Site } from "./state";
import { MenuItem } from "./menu-item";

export function Preview() {
  const [site, setSite] = useState<Site | "loading">("loading");

  useEffect(() => {
    const handleUpdate = ({ data }: MessageEvent<Message>) => {
      if (data.type == "update") {
        setSite(data.site);
      }
    };

    window.addEventListener("message", handleUpdate);

    const refreshMessage: Message = { type: "refresh" };
    window.parent.postMessage(refreshMessage);

    return () => {
      window.removeEventListener("message", handleUpdate);
    };
  }, []);

  if (site == "loading") {
    return <div>Loading...</div>;
  }

  const { name, nav } = site;

  return (
    <div class="dialog-off-canvas-main-canvas" data-off-canvas-main-canvas>
      <header role="banner" class="masthead">
        <div class="container-masthead">
          <div class="row">
            <div class="col-md-7 col-lg-8" style="padding-right: 45px">
              <a href="https://www.ed.ac.uk">
                <img
                  class="masthead-logo"
                  src="https://www-test.uwp.is.ed.ac.uk/jo/wpp_megamenu_prototype/images/logo.png"
                  alt="The University of Edinburgh"
                />
              </a>
            </div>

            <div class="col-md-5 col-lg-4">
              <div class="masthead-text">
                <ul class="list-inline">
                  <li class="list-inline-item">
                    <a href="https://www.ed.ac.uk/schools-departments">Schools &amp; departments</a>
                  </li>
                  <li class="list-inline-item">
                    <a href="https://www.myed.ed.ac.uk/">MyEd</a>
                  </li>
                </ul>
              </div>
              <div role="search" class="masthead-search">
                <form action="https://search.ed.ac.uk/" method="get">
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
              <div class="badge bg-brand">BETA</div>
              <div>This is a new service – your feedback will help us to improve it.</div>
              <a href="https://edinburgh.onlinesurveys.ac.uk/website-and-communications-website-feedback">
                Take the survey
              </a>
            </div>
          </div>
        </div>
        <div class="masthead-hero">
          <div class="masthead-title">
            <span class="h1">
              <a href="/">{name}</a>
            </span>
            <span class="h2">
              <a href="https://www.ed.ac.uk/information-services">Menu Playground</a>
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
                {nav.map((item) => (
                  <MenuItem key={item.key} item={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
