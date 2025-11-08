import React from "react";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";
import recipes from "../recipes";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const Menu = () => {
  const { addItem } = useCart();

  const handleOrder = (recipe) => {
    addItem({
      id: recipe.id,
      title: recipe.title,
      price: recipe.price,
      image: recipe.image,
    });

    toast.success(`Added ${recipe.title} to your cart.`);
  };

  return (
    <section id="menu" className="section section--menu" aria-labelledby="weekly-specials">
      <div className="section-heading">
        <p className="eyebrow">This Week Only</p>
        <h2 id="weekly-specials">Chef specials crafted for summer evenings</h2>
        <p className="section-subtitle">
          Explore vibrant plates, bright citrus, and bold herbs inspired by the markets of the Mediterranean.
        </p>
        <div className="section-actions">
          <a className="button-link" href="#menu">Download full menu</a>
        </div>
      </div>

      <div className="menu-grid">
        {recipes.map((recipe) => (
          <article key={recipe.id} className="menu-card">
            <figure className="menu-media">
              <img src={recipe.image} alt={recipe.title} loading="lazy" />
            </figure>
            <div className="menu-body">
              <header className="menu-header">
                <h3>{recipe.title}</h3>
                <p aria-label={`${recipe.price} dollars`}>
                  {currencyFormatter.format(recipe.price)}
                </p>
              </header>
              <p>{recipe.description}</p>
              <div className="menu-actions">
                <button type="button" onClick={() => handleOrder(recipe)}>
                  Order Now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Menu;
