import { JSX } from "preact";

export function Link(props: JSX.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      href={props.href ?? "#"}
      onClick={(e) => {
        e.preventDefault();
      }}
    />
  );
}
