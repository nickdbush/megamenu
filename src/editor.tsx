import { signal, useSignalEffect, useSignal } from "@preact/signals";
import { NavItem, Message, Site, load, nextItemId } from "./state";

type State =
  | {
      loading: true;
    }
  | {
      loading: false;
      site: Site;
    };

const state = signal<State>({ loading: true });

load().then((site) => {
  state.value = { loading: false, site };
});

const updatePreview = (iframe: HTMLIFrameElement, site: Site) => {
  if (iframe.contentWindow == null) {
    return;
  }
  const message: Message = { type: "update", site };
  iframe.contentWindow.postMessage(message);
};

export function Editor() {
  const preview = useSignal<HTMLIFrameElement | null>(null);

  useSignalEffect(() => {
    // When the state changes, update the iframe (if it exists)
    const _preview = preview.peek();
    if (state.value.loading || _preview == null) return;
    updatePreview(_preview, state.value.site);
  });

  useSignalEffect(() => {
    // When the iframe changes, update with state (if it has loaded)
    const handleUpdate = ({ data }: MessageEvent<Message>) => {
      const _state = state.peek();
      if (preview.value == null || _state.loading) return;
      if (data.type == "refresh") {
        updatePreview(preview.value!, _state.site);
      }
    };

    window.addEventListener("message", handleUpdate);
    return () => {
      window.removeEventListener("message", handleUpdate);
    };
  });

  const setSite = (site: Site) => {
    state.value = {
      loading: false,
      site,
    };
  };

  if (state.value.loading) {
    return <div>Loading...</div>;
  }

  const { site } = state.value;

  return (
    <div>
      <iframe
        style={{ width: "100%", height: "500px" }}
        src="/preview.html"
        ref={(ref) => {
          preview.value = ref;
        }}
      />
      <div>
        {site.nav.map(({ id, title }) => {
          return (
            <div key={id}>
              <input
                value={title}
                onInput={(e) => {
                  setSite({
                    ...site,
                    nav: site.nav.map((item) => {
                      if (item.id == id) {
                        return { ...item, title: e.currentTarget.value };
                      } else {
                        return item;
                      }
                    }),
                  });
                }}
              />
              <button
                onClick={() => {
                  setSite({ ...site, nav: site.nav.filter((item) => item.id != id) });
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
              setSite({
                ...site,
                nav: [...site.nav, makeItem("Unset")],
              });
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
    id: nextItemId(),
    title,
    children,
  };
}
