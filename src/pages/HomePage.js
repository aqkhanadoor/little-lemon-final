import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Menu from "../components/Menu";

const highlights = [
  {
    title: "Seasonal Menus",
    description:
      "Local, sustainable ingredients drive a rotating menu that keeps every visit fresh and inspiring.",
  },
  {
    title: "Artisan Beverages",
    description:
      "Crafted cocktails and zero-proof pairings designed by our in-house mixologists to elevate your meal.",
  },
  {
    title: "Immersive Atmosphere",
    description:
      "A warm space with open-kitchen energy, curated playlists, and lighting that adapts to the evening.",
  },
];

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const target = document.querySelector(location.hash);
    if (target) {
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location]);

  return (
    <main className="page page--home">
      <Header />
      <section className="section section--highlights" aria-labelledby="home-highlights">
        <div className="section-heading">
          <p className="eyebrow">Little Lemon Experience</p>
          <h2 id="home-highlights">Elevated dining inspired by the Mediterranean coast</h2>
          <p className="section-subtitle">
            Share small plates, savor bold flavors, and celebrate the people around your table.
          </p>
        </div>
        <div className="feature-grid">
          {highlights.map((item) => (
            <article key={item.title} className="feature-card">
              <div className="feature-marker" aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
      <Menu />
    </main>
  );
};

export default HomePage;
