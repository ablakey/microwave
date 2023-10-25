import { createRoot } from "react-dom/client";
import { Microwave } from "./Microwave";

const container = document.getElementById("frame");
const root = createRoot(container!);

root.render(<Microwave />);
