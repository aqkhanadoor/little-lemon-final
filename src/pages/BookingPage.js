import React, { useCallback, useMemo, useReducer } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { fetchAvailabilityForDate, submitBookingRequest } from "../utils/bookingApi";

const buildInitialState = () => {
  const today = new Date();
  const isoDate = today.toISOString().split("T")[0];
  return {
    date: isoDate,
    availableTimes: fetchAvailabilityForDate(today),
  };
};

const availabilityReducer = (state, action) => {
  switch (action.type) {
    case "set-date": {
      const nextDate = action.payload;
      return {
        date: nextDate,
        availableTimes: fetchAvailabilityForDate(nextDate),
      };
    }
    default:
      return state;
  }
};

const BookingPage = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(availabilityReducer, undefined, buildInitialState);

  const handleDateChange = useCallback((nextDate) => {
    dispatch({ type: "set-date", payload: nextDate });
  }, []);

  const handleSubmit = useCallback(
    async (formValues) => {
      try {
        const result = await submitBookingRequest(formValues);
        if (result?.ok) {
          toast.success("Your table is booked. We will be ready for you!");
          navigate("/confirmed", { state: { booking: result.payload } });
        } else {
          toast.error("We could not secure your table. Please try another time slot.");
        }
        return result;
      } catch (error) {
        toast.error("We could not secure your table. Please try again.");
        return { ok: false, error };
      }
    },
    [navigate]
  );

  const heroCopy = useMemo(
    () => ({
      title: "Book Your Table",
      subtitle:
        "Secure your evening with chef-driven plates, thoughtful service, and a table that feels like home.",
    }),
    []
  );

  return (
    <main className="page page--booking">
      <section className="section section--booking" aria-labelledby="booking-title">
        <div className="section-heading">
          <p className="eyebrow">Reservations</p>
          <h1 id="booking-title">{heroCopy.title}</h1>
          <p className="section-subtitle">{heroCopy.subtitle}</p>
        </div>
        <div className="booking-layout">
          <div className="booking-panel">
            <BookingForm
              selectedDate={state.date}
              availableTimes={state.availableTimes}
              onDateChange={handleDateChange}
              onSubmit={handleSubmit}
            />
          </div>
          <aside className="booking-aside" aria-label="Dining notes">
            <h2>We hold your table for fifteen minutes.</h2>
            <ul>
              <li>Need a large party reservation? Call us at +1 (312) 555-0110.</li>
              <li>Let us know about dietary needs so the kitchen can prepare in advance.</li>
              <li>Walk-ins are welcome, but reservations guarantee the chef tasting menu.</li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default BookingPage;
