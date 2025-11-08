import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

const buildDefaultValues = (selectedDate, availableTimes) => ({
  fullName: "",
  email: "",
  date: selectedDate,
  time: availableTimes[0] ?? "",
  partySize: 2,
  occasion: "",
  specialRequests: "",
});

const BookingForm = ({ selectedDate, availableTimes, onDateChange, onSubmit }) => {
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: buildDefaultValues(selectedDate ?? today, availableTimes),
  });

  const watchedDate = watch("date");
  const watchedTime = watch("time");

  useEffect(() => {
    if (selectedDate) {
      setValue("date", selectedDate, { shouldDirty: false, shouldTouch: false });
    }
  }, [selectedDate, setValue]);

  useEffect(() => {
    if (!watchedDate || watchedDate === selectedDate) {
      return;
    }
    onDateChange(watchedDate);
  }, [watchedDate, selectedDate, onDateChange]);

  useEffect(() => {
    if (!availableTimes.length) {
      setValue("time", "", { shouldDirty: true });
      return;
    }

    if (!availableTimes.includes(watchedTime)) {
      setValue("time", availableTimes[0], { shouldDirty: true });
    }
  }, [availableTimes, watchedTime, setValue]);

  const submitHandler = handleSubmit(async (values) => {
    const response = await onSubmit(values);
    if (response?.reset !== false) {
      reset(buildDefaultValues(values.date, availableTimes));
    }
  });

  return (
    <form className="booking-form" onSubmit={submitHandler} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="full-name">Full Name</label>
          <input
            id="full-name"
            type="text"
            placeholder="Jane Doe"
            {...register("fullName", {
              required: "Please enter your name.",
              minLength: {
                value: 3,
                message: "Name should be at least three characters.",
              },
            })}
          />
          {errors.fullName && <p className="field-error">{errors.fullName.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="jane@example.com"
            autoComplete="email"
            {...register("email", {
              required: "An email helps us share updates.",
              pattern: {
                value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
                message: "Enter a valid email address.",
              },
            })}
          />
          {errors.email && <p className="field-error">{errors.email.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="booking-date">Choose Date</label>
          <input
            id="booking-date"
            type="date"
            min={today}
            {...register("date", { required: "Select a date for your reservation." })}
          />
          {errors.date && <p className="field-error">{errors.date.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="booking-time">Choose Time</label>
          <select
            id="booking-time"
            disabled={!availableTimes.length}
            {...register("time", {
              required: "Pick an available time slot.",
            })}
          >
            {availableTimes.length === 0 && <option value="">No tables available</option>}
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.time && <p className="field-error">{errors.time.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="party-size">Party Size</label>
          <input
            id="party-size"
            type="number"
            min="1"
            max="10"
            inputMode="numeric"
            {...register("partySize", {
              required: "Let us know how many seats to prepare.",
              min: {
                value: 1,
                message: "A reservation must include at least one guest.",
              },
              max: {
                value: 10,
                message: "For parties larger than ten, please call the restaurant.",
              },
            })}
          />
          {errors.partySize && <p className="field-error">{errors.partySize.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            {...register("occasion", {
              required: "Tell us what we are celebrating.",
            })}
          >
            <option value="">Select an option</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="date-night">Date night</option>
            <option value="just-because">Just because</option>
          </select>
          {errors.occasion && <p className="field-error">{errors.occasion.message}</p>}
        </div>

        <div className="form-field form-field--full">
          <label htmlFor="special-requests">Special Requests</label>
          <textarea
            id="special-requests"
            rows={4}
            placeholder="Allergies, seating ideas, or anything else we should know."
            {...register("specialRequests")}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting || !availableTimes.length}>
          {isSubmitting ? "Booking..." : "Make Your Reservation"}
        </button>
        {!availableTimes.length && (
          <p className="form-helper">
            We are fully booked for the selected date. Try a different evening or call the restaurant.
          </p>
        )}
      </div>
    </form>
  );
};

export default BookingForm;
