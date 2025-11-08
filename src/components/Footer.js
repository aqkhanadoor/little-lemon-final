import React from "react";
import { Link } from "react-router-dom";
import smallLogo from "../images/Logo .svg";

const Footer = () => {
    return (
        <footer className="footer" aria-labelledby="footer-heading">
            <div className="footer-inner">
                <div className="footer-brand">
                    <img src={smallLogo} alt="Little Lemon" />
                    <p>
                        Little Lemon celebrates seasonal Mediterranean flavors, heartfelt hospitality, and the joy of gathering in
                        Chicago's River North neighborhood.
                    </p>
                </div>
                <div className="footer-group">
                    <h2 id="footer-heading">Plan your visit</h2>
                    <address className="footer-address">
                        <span>123 Lemon Lane</span>
                        <span>Chicago, IL 60611</span>
                    </address>
                    <ul className="footer-list">
                        <li>Dining hours: Mon-Thu 4pm-10pm, Fri-Sat 12pm-11pm, Sun 12pm-9pm</li>
                        <li>Validated parking available after 5pm at Wabash and Oak</li>
                    </ul>
                </div>
                <div className="footer-group">
                    <h2>Guest services</h2>
                    <ul className="footer-list">
                        <li>Host stand: (312) 555-0110</li>
                        <li>Email: reservations@littlelemon.com</li>
                        <li>Private dining: events@littlelemon.com</li>
                        <li>
                            <Link to="/contact">Message our hospitality team</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-group">
                    <h2>Connect</h2>
                    <ul className="footer-list">
                        <li>
                            <a
                                href="https://www.linkedin.com/in/ashique-khan-s-b0a1932b6/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Ashique Khan on LinkedIn
                            </a>
                        </li>
                        <li>
                            <a href="mailto:hello@littlelemon.com">hello@littlelemon.com</a>
                        </li>
                        <li>
                            <Link to="/booking">Reserve a table</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <p className="footer-meta">© {new Date().getFullYear()} Little Lemon Hospitality Group. All rights reserved.</p>
        </footer>
    );
};

export default Footer;