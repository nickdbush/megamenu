import { NavItem } from "./state";

export function MenuItem({ item }: { item: NavItem }) {
  return (
    <li class="nav-item dropdown position-static">
      <a
        class="nav-link dropdown-toggle px-3 level-1 text-dark"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {item.title}
      </a>
      {item.children.length > 0 && <Dropdown parent={item} />}
    </li>
  );
}

function Dropdown({ parent }: { parent: NavItem }) {
  return (
    <div class="dropdown-menu w-100 container">
      <div class="container mega-dropdown">
        <div class="row my-md-2">
          <div class="col">
            <ul>
              <li>
                <a class="dropdown-item text-wrap text-brand overview-link" href="#">
                  {parent.title} overview<i class="bi-chevron-right" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 my-md-2 menu-section">
          {parent.children.map((item) => (
            <div key={item.key} class="col mb-lg-5 menu-col px-0">
              <ul>
                <li>
                  <a class="dropdown-item text-wrap text-brand level-2" href="#">
                    {item.title}
                    <i class="bi-chevron-right" aria-hidden="true"></i>
                  </a>
                  {item.children.length > 0 && <Submenu parent={item} />}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Submenu({ parent }: { parent: NavItem }) {
  return (
    <ul>
      {parent.children.map((item) => (
        <li>
          <a class="dropdown-item text-wrap level-3 text-dark" href="#">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
