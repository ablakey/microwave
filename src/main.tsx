import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container!);

function App() {
  return <div>Hello world!</div>;
}

root.render(<App />);
