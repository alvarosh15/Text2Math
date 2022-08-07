import { MathJaxContext } from "better-react-mathjax";
import "./App.css";
import Main from "./components/Main.jsx";

const config = {
  loader: { load: ["input/asciimath"] },
  asciimath: {
    displaystyle: true,
    delimiters: [
      ["$", "$"],
      ["`", "`"]
    ]
  }
};

function App() {
  return <MathJaxContext config={config}><Main /></MathJaxContext>
}

export default App;
