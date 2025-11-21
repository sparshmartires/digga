
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  /* Required for leaflet maps to display correctly */
import 'leaflet/dist/leaflet.css';

  import "./index.css";

  createRoot(document.getElementById("root")!).render(<App />);
  