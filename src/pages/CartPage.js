import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const serviceFeeByType = {
  dineIn: 0,
  pickup: 0,
  delivery: 4.5,
};

const orderTypeLabels = {
  dineIn: "dine in",
  pickup: "pickup",
  delivery: "delivery",
};

const CartPage = () => {
  const { items, subtotal, itemCount, updateQuantity, removeItem, clearCart } = useCart();
  const [orderType, setOrderType] = useState("pickup");
  const [scheduledTime, setScheduledTime] = useState("18:30");
  const [notes, setNotes] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: "",
    city: "",
    instructions: "",
  });

  const serviceFee = useMemo(() => serviceFeeByType[orderType] || 0, [orderType]);
  const tax = useMemo(() => (subtotal ? subtotal * 0.08 : 0), [subtotal]);
  const orderTotal = useMemo(() => subtotal + serviceFee + tax, [subtotal, serviceFee, tax]);
  const isCartEmpty = items.length === 0;

  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      removeItem(item.id);
      return;
    }

    updateQuantity(item.id, item.quantity - 1);
  };

  const handleIncrease = (item) => {
    updateQuantity(item.id, Math.min(item.quantity + 1, 99));
  };

  const handleQuantityInput = (itemId, value) => {
    const parsed = Number(value);

    if (Number.isNaN(parsed) || parsed < 1 || parsed > 99) {
      return;
    }

    updateQuantity(itemId, parsed);
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    if (isCartEmpty) {
      toast.error("Your cart is empty. Add a few dishes to continue.");
      return;
    }

    if (orderType === "delivery" && deliveryDetails.address.trim().length < 5) {
      toast.error("Please share a delivery address so we know where to bring dinner.");
      return;
    }

    const formattedTotal = currencyFormatter.format(orderTotal);
    const friendlyType = orderTypeLabels[orderType];

    toast.success(`Order confirmed for ${friendlyType} at ${scheduledTime}. Total: ${formattedTotal}.`);

    clearCart();
    setNotes("");
    setDeliveryDetails({ address: "", city: "", instructions: "" });
  };

  return (
    <main className="page page--cart">
      <section className="section">
        <div className="cart-layout">
          <div className="cart-panel" aria-live="polite">
            <header className="cart-panel__header">
              <h1>Your Order</h1>
              <p>{itemCount ? `${itemCount} item${itemCount > 1 ? "s" : ""}` : "No items yet"}</p>
            </header>

            {isCartEmpty ? (
              <div className="cart-empty">
                <p>Your cart is feeling a little lonely. Head back to the menu to add something delicious.</p>
                <Link className="button-link" to="/#menu">
                  Browse Menu
                </Link>
              </div>
            ) : (
              <ul className="cart-items">
                {items.map((item) => (
                  <li key={item.id} className="cart-item">
                    {item.image ? (
                      <figure className="cart-item__media">
                        <img src={item.image} alt="" loading="lazy" />
                      </figure>
                    ) : null}
                    <div className="cart-item__body">
                      <header className="cart-item__header">
                        <h3>{item.title}</h3>
                        <p>{currencyFormatter.format(item.price * item.quantity)}</p>
                      </header>
                      <div className="cart-item__controls">
                        <div className="quantity-control" aria-label={`Quantity controls for ${item.title}`}>
                          <button type="button" onClick={() => handleDecrease(item)} aria-label={`Reduce ${item.title} quantity`}>
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            max="99"
                            value={item.quantity}
                            onChange={(event) => handleQuantityInput(item.id, event.target.value)}
                            aria-label={`${item.title} quantity`}
                          />
                          <button type="button" onClick={() => handleIncrease(item)} aria-label={`Increase ${item.title} quantity`}>
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="cart-item__remove"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form className="cart-summary" onSubmit={handlePlaceOrder} aria-labelledby="order-summary-heading">
            <h2 id="order-summary-heading">Order options</h2>
            <fieldset className="cart-summary__fieldset">
              <legend>How would you like to enjoy your meal?</legend>
              <div className="order-type-grid">
                <label className={`order-type-card${orderType === "dineIn" ? " is-selected" : ""}`}>
                  <input
                    type="radio"
                    name="orderType"
                    value="dineIn"
                    checked={orderType === "dineIn"}
                    onChange={(event) => setOrderType(event.target.value)}
                  />
                  <span className="order-type-card__label">Dine in</span>
                  <span className="order-type-card__hint">We will have a table ready for you.</span>
                </label>
                <label className={`order-type-card${orderType === "pickup" ? " is-selected" : ""}`}>
                  <input
                    type="radio"
                    name="orderType"
                    value="pickup"
                    checked={orderType === "pickup"}
                    onChange={(event) => setOrderType(event.target.value)}
                  />
                  <span className="order-type-card__label">Pick up</span>
                  <span className="order-type-card__hint">Swing by the host stand when you arrive.</span>
                </label>
                <label className={`order-type-card${orderType === "delivery" ? " is-selected" : ""}`}>
                  <input
                    type="radio"
                    name="orderType"
                    value="delivery"
                    checked={orderType === "delivery"}
                    onChange={(event) => setOrderType(event.target.value)}
                  />
                  <span className="order-type-card__label">Delivery</span>
                  <span className="order-type-card__hint">We partner with local couriers to reach you fast.</span>
                </label>
              </div>
            </fieldset>

            <div className="cart-summary__group">
              <label htmlFor="scheduled-time">Preferred time</label>
              <input
                id="scheduled-time"
                type="time"
                value={scheduledTime}
                onChange={(event) => setScheduledTime(event.target.value)}
              />
            </div>

            {orderType === "delivery" ? (
              <div className="cart-summary__grid">
                <div className="cart-summary__group">
                  <label htmlFor="delivery-address">Delivery address</label>
                  <input
                    id="delivery-address"
                    type="text"
                    placeholder="123 Lemon Lane"
                    value={deliveryDetails.address}
                    onChange={(event) =>
                      setDeliveryDetails((details) => ({ ...details, address: event.target.value }))
                    }
                  />
                </div>
                <div className="cart-summary__group">
                  <label htmlFor="delivery-city">City</label>
                  <input
                    id="delivery-city"
                    type="text"
                    placeholder="Chicago"
                    value={deliveryDetails.city}
                    onChange={(event) =>
                      setDeliveryDetails((details) => ({ ...details, city: event.target.value }))
                    }
                  />
                </div>
                <div className="cart-summary__group cart-summary__group--full">
                  <label htmlFor="delivery-instructions">Courier notes (optional)</label>
                  <textarea
                    id="delivery-instructions"
                    rows="3"
                    placeholder="Gate code, drop-off instructions, etc."
                    value={deliveryDetails.instructions}
                    onChange={(event) =>
                      setDeliveryDetails((details) => ({ ...details, instructions: event.target.value }))
                    }
                  />
                </div>
              </div>
            ) : null}

            <div className="cart-summary__group">
              <label htmlFor="order-notes">Special requests (optional)</label>
              <textarea
                id="order-notes"
                rows="3"
                placeholder="Let us know about allergies or special touches."
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </div>

            <div className="order-totals">
              <div className="order-totals__row">
                <span>Subtotal</span>
                <span>{currencyFormatter.format(subtotal)}</span>
              </div>
              <div className="order-totals__row">
                <span>Service</span>
                <span>{currencyFormatter.format(serviceFee)}</span>
              </div>
              <div className="order-totals__row">
                <span>Estimated tax</span>
                <span>{currencyFormatter.format(tax)}</span>
              </div>
              <div className="order-totals__row order-totals__row--total">
                <span>Total due</span>
                <span>{currencyFormatter.format(orderTotal)}</span>
              </div>
            </div>

            <div className="cart-summary__actions">
              <button type="submit" disabled={isCartEmpty}>
                Place Order
              </button>
              {!isCartEmpty && (
                <button type="button" className="button-link" onClick={clearCart}>
                  Clear Cart
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CartPage;
