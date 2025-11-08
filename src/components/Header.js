import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../images/restauranfood.jpg";

const Header = () => {
  const navigate = useNavigate();

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-copy">
          <p className="eyebrow">Little Lemon | Chicago</p>
          <h1 id="hero-heading">Modern Mediterranean dining with heart</h1>
          <p>
            A neighborhood restaurant celebrating vibrant coastal cuisine, handcrafted cocktails, and the joy of gathering.
            Reserve a table to experience chef specials, tableside moments, and a team that treats you like family.
          </p>
          <div className="hero-actions">
            <button type="button" onClick={() => navigate("/booking")}>Reserve Table</button>
            <button
              type="button"
              className="button--ghost"
              onClick={() => navigate("/booking")}
            >
              Check Availability
            </button>
          </div>
        </div>
        <figure className="hero-media">
          <img src={heroImage} alt="Plated Mediterranean dishes ready to serve" />
        </figure>
      </div>
    </section>
  );
};

export default Header;
