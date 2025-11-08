const seededRandom = (seed) => {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed % m;
  return () => {
    s = (s * a) % m;
    return s / m;
  };
};

export const fetchAvailabilityForDate = (dateInput) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const random = seededRandom(date.getDate());
  const slots = [];

  for (let hour = 17; hour <= 22; hour += 1) {
    if (random() < 0.6) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
    }
    if (random() < 0.4) {
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }

  return slots.sort();
};

export const submitBookingRequest = async (formData) => {
  const payload = { ...formData, submittedAt: new Date().toISOString() };

  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({ ok: true, payload });
    }, 650);
  });
};
