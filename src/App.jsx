import React, { Suspense, useRef } from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import Chevron from "./Components/Chevron";

const Header = React.lazy(() => import("./Components/Header"));
const Home = React.lazy(() => import("./Pages/Home"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const Recipe = React.lazy(() => import("./Pages/Recipe"));

function App() {
  const heroRef = useRef();
  const headerRef = useRef();

  const isRecipePage = useMatch("/:id");

  return (
    <div className="app">
      {!isRecipePage && (
        <>
          <Suspense fallback={<div>Loading Header...</div>}>
            <Header headerRef={headerRef} />
          </Suspense>
          <Chevron heroRef={heroRef} headerRef={headerRef} />
        </>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home heroRef={heroRef} />} />
          <Route path="/:id" element={<Recipe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
