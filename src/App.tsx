import { AnimatePresence, MotionConfig } from "framer-motion";
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import PageTransition from "./components/layout/PageTransition";
import { getTransitionOrigin, resetTransitionOrigin } from "./lib/transitionOrigin";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const location = useLocation();
  // Il timbro compare solo dopo una navigazione interna, non al primo caricamento.
  const [initialPath] = useState(location.pathname);
  const [navigated, setNavigated] = useState(false);
  if (!navigated && location.pathname !== initialPath) setNavigated(true);

  const page = (label: string, element: React.ReactNode) => (
    <PageTransition label={label} animateIn={navigated}>
      {element}
      <Footer />
    </PageTransition>
  );

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <AnimatePresence
        mode="wait"
        custom={getTransitionOrigin()}
        onExitComplete={() => {
          resetTransitionOrigin();
          window.scrollTo({ top: 0, behavior: "instant" });
        }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={page("Benvenuti", <HomePage />)} />
          <Route path="/menu" element={page("Il menu", <MenuPage />)} />
          <Route path="*" element={page("Pagina non trovata", <NotFoundPage />)} />
        </Routes>
      </AnimatePresence>
    </MotionConfig>
  );
}
