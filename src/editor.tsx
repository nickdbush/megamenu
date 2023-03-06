import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { NavItem, Message, Site, load } from "./state";

let nextKey = 0;

export function Editor() {
  const [state, setState] = useState<Site | "loading">("loading");
  const preview = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    load().then((site) => {
      setState(site);
    });
  }, []);

  const updatePreview = () => {
    if (state == "loading") {
      throw new Error("Preview update requested when in loading state");
    }
    if (preview.current?.contentWindow == null) {
      return;
    }
    const message: Message = { type: "update", site: state };
    preview.current.contentWindow.postMessage(message);
  };

  useEffect(() => {
    if (state == "loading") return;
    updatePreview();
  }, [state]);

  useEffect(() => {
    const handleUpdate = ({ data }: MessageEvent<Message>) => {
      if (data.type == "refresh" && state != "loading") {
        updatePreview();
      }
    };

    window.addEventListener("message", handleUpdate);
    return () => {
      window.removeEventListener("message", handleUpdate);
    };
  }, [state]);

  const setSite = (cb: (site: Site) => Site) => {
    setState((state) => {
      if (state == "loading") return state;
      return cb(state);
    });
  };

  if (state == "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <iframe style={{ width: "100%", height: "500px" }} src="/preview.html" ref={preview} />
      <div>
        {state.nav.map(({ key, title }) => {
          return (
            <div key={key}>
              <input
                value={title}
                onInput={(e) => {
                  setSite((site) => ({
                    ...site,
                    nav: site.nav.map((item) => {
                      if (item.key == key) {
                        return { ...item, title: e.currentTarget.value };
                      } else {
                        return item;
                      }
                    }),
                  }));
                }}
              />
              <button
                onClick={() => {
                  setSite((site) => ({ ...site, nav: site.nav.filter((item) => item.key != key) }));
                }}
              >
                X
              </button>
              <span>{title.length} characters</span>
            </div>
          );
        })}
        <div>
          <button
            onClick={() => {
              setSite((site) => ({
                ...site,
                nav: [...site.nav, makeItem("Unset")],
              }));
            }}
          >
            New +
          </button>
        </div>
      </div>
    </div>
  );
}

function makeItem(title: string, children: NavItem[] = []): NavItem {
  return {
    key: nextKey++,
    title,
    children,
  };
}
