import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Confirmation from '../Confirmation/Confirmation';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

test('renders a back button that navigates to the booking view', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Confirmation />
    </Router>
  );

  const backButton = screen.getByText(/back to booking/i);
  fireEvent.click(backButton);

  expect(history.location.pathname).toBe('/booking');
});
