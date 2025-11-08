import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import BookingForm from "./components/BookingForm";

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

test("Hero CTA navigates to the booking experience", async () => {
  renderWithRouter(<App />);

  const reserveButton = screen.getByRole("button", { name: /reserve table/i });
  await userEvent.click(reserveButton);

  expect(screen.getByRole("heading", { name: /book your table/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
});

test("Booking form reflects time availability on date change", () => {
  const handleDateChange = jest.fn();
  const handleSubmit = jest.fn();

  render(
    <BookingForm
      selectedDate="2025-06-01"
      availableTimes={["17:00", "18:30"]}
      onDateChange={handleDateChange}
      onSubmit={handleSubmit}
    />
  );

  const dateInput = screen.getByLabelText(/choose date/i);
  const timeSelect = screen.getByLabelText(/choose time/i);

  expect(timeSelect.value).toBe("17:00");

  fireEvent.change(dateInput, { target: { value: "2025-06-02" } });
  expect(handleDateChange).toHaveBeenCalledWith("2025-06-02");
});