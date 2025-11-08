import React from "react";
import { Link, useLocation } from "react-router-dom";

const ConfirmedBooking = () => {
    const { state } = useLocation();
    const booking = state?.booking;

    return (
        <main className="page page--confirmation">
            <section className="confirmation" aria-labelledby="confirmation-title">
                <div className="confirmation-card">
                    <p className="eyebrow">Reservation Confirmed</p>
                    <h1 id="confirmation-title">We will see you soon at Little Lemon</h1>
                    <p>
                        Thank you for booking with us. A confirmation email has been sent with the details below.
                        We cannot wait to cook for you.
                    </p>
                    <dl className="confirmation-details">
                        <div>
                            <dt>Name</dt>
                            <dd>{booking?.fullName ?? "Guest"}</dd>
                        </div>
                        <div>
                            <dt>Date</dt>
                            <dd>{booking?.date ?? "TBD"}</dd>
                        </div>
                        <div>
                            <dt>Time</dt>
                            <dd>{booking?.time ?? "TBD"}</dd>
                        </div>
                        <div>
                            <dt>Party Size</dt>
                            <dd>{booking?.partySize ?? "--"}</dd>
                        </div>
                        {booking?.occasion && (
                            <div>
                                <dt>Occasion</dt>
                                <dd>{booking.occasion.replace(/-/g, " ")}</dd>
                            </div>
                        )}
                        {booking?.specialRequests && (
                            <div>
                                <dt>Special Requests</dt>
                                <dd>{booking.specialRequests}</dd>
                            </div>
                        )}
                    </dl>
                    <div className="confirmation-actions">
                        <Link to="/booking" className="button-link">
                            Modify Reservation
                        </Link>
                        <Link to="/" className="button-link">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ConfirmedBooking;