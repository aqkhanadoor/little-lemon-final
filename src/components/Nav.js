import React, { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "../images/Logo .svg";

const links = [
  { label: "Home", to: "/", type: "route" },
  { label: "Menu", to: "#menu", type: "hash" },
  { label: "Reservations", to: "/booking", type: "route" },
  { label: "Order Online", to: "/cart", type: "route" },
  { label: "Contact", to: "/contact", type: "route" },
];

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    document.body.classList.toggle("nav-open", menuOpen);

    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [menuOpen]);

  const handleHashNavigation = useCallback(
    (event, hash) => {
      event.preventDefault();
      setMenuOpen(false);

      if (location.pathname !== "/") {
        navigate({ pathname: "/", hash });
        return;
      }

      window.requestAnimationFrame(() => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    },
    [location.pathname, navigate]
  );

  return (
    <header className="top-nav">
      <div className="top-nav__inner">
        <Link to="/" className="nav-logo" aria-label="Little Lemon home">
          <img src={logo} alt="Little Lemon" />
        </Link>
        <button
          type="button"
          className={`nav-toggle${menuOpen ? " nav-toggle--open" : ""}`}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle__icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="nav-toggle__label">{menuOpen ? "Close" : "Menu"}</span>
        </button>
        <nav className="primary-nav" aria-label="Primary navigation">
          <ul
            id="primary-navigation"
            className={`primary-nav__list ${menuOpen ? "primary-nav__list--open" : ""}`}
          >
            {links.map((link) => {
              const isCartLink = link.to === "/cart";

              return (
                <li key={link.label} className={`primary-nav__item${isCartLink ? " primary-nav__item--cta" : ""}`}>
                  {link.type === "hash" ? (
                    <a
                      href={link.to}
                      onClick={(event) => handleHashNavigation(event, link.to)}
                      className={`primary-nav__link${isCartLink ? " primary-nav__link--cta" : ""}`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <NavLink
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) => {
                        const classes = ["primary-nav__link"];

                        if (isActive) {
                          classes.push("primary-nav__link--active");
                        }

                        if (isCartLink) {
                          classes.push("primary-nav__link--cta");
                        }

                        return classes.join(" ");
                      }}
                    >
                      {isCartLink ? (
                        <span className="primary-nav__cart-label">
                          {link.label}
                          {itemCount > 0 && (
                            <span className="nav-cart-count" aria-label={`${itemCount} items in cart`}>
                              {itemCount}
                            </span>
                          )}
                        </span>
                      ) : (
                        link.label
                      )}
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {menuOpen ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
    </header>
  );
};

export default Nav;
