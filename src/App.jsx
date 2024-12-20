import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Recipe from "./Pages/Recipe";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/recipes" element={<Home />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;