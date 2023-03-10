import { Link } from "./link";
import { NavItem } from "./state";

export function MenuItem({ item }: { item: NavItem }) {
  return (
    <li class="nav-item dropdown position-static">
      <Link
        class="nav-link dropdown-toggle px-3 level-1 text-dark"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {item.title}
      </Link>
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
                <Link class="dropdown-item text-wrap text-brand overview-link">
                  {parent.title} overview<i class="bi-chevron-right" aria-hidden="true"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 my-md-2 menu-section">
          {parent.children.map((item) => (
            <div key={item.key} class="col mb-lg-5 menu-col px-0">
              <ul>
                <li>
                  <Link class="dropdown-item text-wrap text-brand level-2">
                    {item.title}
                    <i class="bi-chevron-right" aria-hidden="true"></i>
                  </Link>
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
          <Link class="dropdown-item text-wrap level-3 text-dark">{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}
