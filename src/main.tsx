import { createRoot } from "react-dom/client";
import "./app/styles/index.css";
import { App } from "./app/components";

createRoot(document.getElementById("root")!).render(<App />);
