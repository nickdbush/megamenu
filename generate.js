import purify from "purify-css";

const content = ["src/preview.tsx", "src/preview-main.tsx", "src/menu-item.tsx", "src/link.tsx"];
const css = ["preview/**/*.css"];

const options = {
  output: "public/preview.css",
  info: true,
  minify: true,
};

purify(content, css, options);
