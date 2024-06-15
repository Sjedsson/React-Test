import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingInfo from '../BookingInfo/BookingInfo';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('/api/booking', (req, res, ctx) => {
    return res(ctx.json({ bookingNumber: '12345', totalAmount: 360 }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('returns a booking number on successful booking', async () => {
  render(<BookingInfo />);
  const dateInput = screen.getByLabelText(/date/i);
  const timeInput = screen.getByLabelText(/time/i);
  const playersInput = screen.getByLabelText(/number of players/i);
  const submitButton = screen.getByText(/submit/i);

  fireEvent.change(dateInput, { target: { value: '2023-06-01' } });
  fireEvent.change(timeInput, { target: { value: '18:00' } });
  fireEvent.change(playersInput, { target: { value: '3' } });
  fireEvent.click(submitButton);

  const bookingNumber = await screen.findByText(/booking number: 12345/i);
  expect(bookingNumber).toBeInTheDocument();
});

test('returns the total amount on successful booking', async () => {
  render(<BookingInfo />);
  const dateInput = screen.getByLabelText(/date/i);
  const timeInput = screen.getByLabelText(/time/i);
  const playersInput = screen.getByLabelText(/number of players/i);
  const submitButton = screen.getByText(/submit/i);

  fireEvent.change(dateInput, { target: { value: '2023-06-01' } });
  fireEvent.change(timeInput, { target: { value: '18:00' } });
  fireEvent.change(playersInput, { target: { value: '3' } });
  fireEvent.click(submitButton);

  const totalAmount = await screen.findByText(/total amount: 360/i);
  expect(totalAmount).toBeInTheDocument();
});
