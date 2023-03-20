import { render } from "preact";
import { Editor } from "./editor";
import "./index.css";

render(<Editor />, document.getElementById("app") as HTMLElement);
