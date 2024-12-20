import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

const Header = React.lazy(() => import("./Components/Header"));
const Home = React.lazy(() => import("./Pages/Home"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const Recipe = React.lazy(() => import("./Pages/Recipe"));

function App() {
  const location = useLocation();

  return (
    <div className="app">
      {!location.pathname.includes('*') && (
        <Suspense fallback={<div>Loading Header...</div>}>
          <Header />
        </Suspense>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Recipe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
