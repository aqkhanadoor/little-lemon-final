import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const contactMethods = [
  {
    id: "phone",
    label: "Call us",
    value: "(312) 555-0180",
    href: "tel:3125550180",
    hint: "Daily between 2:00pm and close",
  },
  {
    id: "email",
    label: "Email",
    value: "hello@littlelemon.com",
    href: "mailto:hello@littlelemon.com",
    hint: "We reply within one business day",
  },
  {
    id: "chat",
    label: "Live chat",
    value: "Start a conversation",
    href: "#support",
    hint: "Weekdays from 10:00am to 6:00pm",
  },
];

const serviceHours = [
  { days: "Monday - Thursday", hours: "4:00pm - 10:00pm" },
  { days: "Friday", hours: "4:00pm - 11:00pm" },
  { days: "Saturday", hours: "12:00pm - 11:00pm" },
  { days: "Sunday", hours: "12:00pm - 9:00pm" },
];

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  seating: "dining",
  newsletter: false,
};

const ContactPage = () => {
  const [formState, setFormState] = useState(initialFormState);

  const isFormValid = useMemo(() => {
    return formState.name.trim() && formState.email.trim() && formState.message.trim();
  }, [formState.name, formState.email, formState.message]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((state) => ({ ...state, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormState((state) => ({ ...state, [name]: checked }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      toast.error("Please share your name, email, and how we can help.");
      return;
    }

  toast.success("Thank you! Our team will be in touch soon.");
  setFormState(() => ({ ...initialFormState }));
  };

  return (
    <main className="page page--contact">
      <section className="section section--contact-intro" aria-labelledby="contact-heading">
        <div className="contact-intro">
          <div className="contact-intro__content">
            <p className="eyebrow">Come say hello</p>
            <h1 id="contact-heading">We are here to help you plan the perfect visit</h1>
            <p>
              Whether you are coordinating a celebration, updating an existing reservation, or curious about dietary
              accommodations, our hospitality team loves solving the little details.
            </p>
            <div className="contact-intro__actions">
              <Link className="button-link" to="/booking">
                Reserve a table
              </Link>
              <a className="button-link button-link--quiet" href="tel:3125550180">
                Call the host stand
              </a>
            </div>
          </div>
          <div className="contact-intro__panel">
            <dl>
              <div>
                <dt>Visit</dt>
                <dd>
                  123 Lemon Lane
                  <br />
                  Chicago, IL 60611
                </dd>
              </div>
              <div>
                <dt>Parking</dt>
                <dd>Validated parking available at the Wabash & Oak garage after 5pm.</dd>
              </div>
              <div>
                <dt>Private dining</dt>
                <dd>Email events@littlelemon.com to craft a custom menu.</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section section--contact-details" aria-labelledby="contact-details-heading">
        <div className="contact-layout">
          <div className="contact-card contact-card--methods" id="support">
            <h2 id="contact-details-heading">Talk with our team</h2>
            <p>
              Reach us by the channel you prefer. We aim to respond quickly and make every interaction feel like the very
              first welcome at the door.
            </p>
            <ul className="contact-methods">
              {contactMethods.map((method) => (
                <li key={method.id}>
                  <a href={method.href} className="contact-method">
                    <span className="contact-method__label">{method.label}</span>
                    <span className="contact-method__value">{method.value}</span>
                    <span className="contact-method__hint">{method.hint}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="contact-hours">
              <h3>Dining hours</h3>
              <ul>
                {serviceHours.map((range) => (
                  <li key={range.days}>
                    <span>{range.days}</span>
                    <span>{range.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="contact-card contact-card--form">
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <h2>Send us a note</h2>
              <p>Share a little about your plans and we will be in touch within one business day.</p>
              <div className="contact-form__grid">
                <label className="form-field">
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label className="form-field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label className="form-field">
                  <span>Phone (optional)</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    value={formState.phone}
                    onChange={handleInputChange}
                    placeholder="(312) 555-0180"
                  />
                </label>
                <label className="form-field">
                  <span>Seating preference</span>
                  <select name="seating" value={formState.seating} onChange={handleInputChange}>
                    <option value="dining">Dining room</option>
                    <option value="patio">Outdoor patio</option>
                    <option value="bar">Chef's counter</option>
                  </select>
                </label>
                <label className="form-field form-field--full">
                  <span>How can we help?</span>
                  <textarea
                    name="message"
                    rows="4"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your party, dietary needs, or special moments to celebrate."
                    required
                  />
                </label>
                <label className="contact-checkbox">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formState.newsletter}
                    onChange={handleCheckboxChange}
                  />
                  <span>Send me seasonal menu updates and events.</span>
                </label>
              </div>
              <div className="contact-form__actions">
                <button type="submit" disabled={!isFormValid}>
                  Submit message
                </button>
                <p className="contact-form__disclaimer">
                  We respect your inbox and will never share your details outside of Little Lemon.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
