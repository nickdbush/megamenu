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

// import clsx from "clsx";
// import { NavItem } from "./editor-state";
// import { JSX } from "preact";

// function getItemClasses(item: NavItem): string {
//   return "";
//   // TODO:
//   // return clsx(
//   //   item.isExpanded && "menu-item--expanded",
//   //   item.isCollapsed && "menu-item--collapsed",
//   //   item.inActiveTrail && "menu-item--active-trail"
//   // );
// }

// export function MegaMenu({ items }: { items: NavItem[] }) {
//   return (
//     <nav class="uoe-nav navbar navbar-expand-md py-0" role="navigation">
//       <div class="container-fluid navbar-light bg-white uoe-mega-menu flex-wrap justify-content-start">
//         <ul class="navbar-nav me-auto ps-lg-0">
//           {items.map((item) => (
//             <NavbarItem key={item.key} item={item} />
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// }

// function NavbarItem({ item }: { item: NavItem }) {
//   const linkClasses = "nav-link dropdown-toggle px-3 text-dark level-0";
//   const content = (() => {
//     if (item.children.length > 0) {
//       return (
//         <>
//           <Link class={linkClasses} role="button" data-bs-toggle="dropdown" aria-expanded="false">
//             {item.title}
//           </Link>
//           <div class="dropdown-menu w-100 container" aria-labelledby="navbarDropdown">
//             <div class="container mega-dropdown">
//               <div class="row my-md-2">
//                 <div class="col">
//                   <ul>
//                     <li>
//                       <Link class="dropdown-item text-wrap text-brand overview-link">
//                         {item.title}
//                         <i class="bi-chevron-right" aria-hidden="true" />
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <DropdownMenu items={item.children} />
//             </div>
//           </div>
//         </>
//       );
//     } else {
//       return <Link class={linkClasses}>{item.title}</Link>;
//     }
//   })();
//   return <li class={clsx("nav-item dropdown position-static", getItemClasses(item))}>{content}</li>;
// }

// function DropdownMenu({ items }: { items: NavItem[] }) {
//   return (
//     <ul>
//       <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 my-md-2 menu-section">
//         {items.map((item) => (
//           <div key={item.key} class="col mb-lg-5 menu-col px-0">
//             <ul>
//               <li class={getItemClasses(item)}>
//                 <Link class="dropdown-item text-wrap text-dark fw-bold level-1">{item.title}</Link>
//                 {item.children.length > 0 && <ThirdMenu items={item.children} />}
//               </li>
//             </ul>
//           </div>
//         ))}
//       </div>
//     </ul>
//   );
// }

// function ThirdMenu({ items }: { items: NavItem[] }) {
//   return (
//     <ul>
//       {items.map((item) => (
//         <li key={item.key}>
//           <Link class={getItemClasses(item)}>{item.title}</Link>
//         </li>
//       ))}
//     </ul>
//   );
// }

// function Link(props: JSX.HTMLAttributes<HTMLAnchorElement>) {
//   return (
//     <a
//       href="#"
//       {...props}
//       onClick={(e) => {
//         e.preventDefault();
//       }}
//     />
//   );
// }
