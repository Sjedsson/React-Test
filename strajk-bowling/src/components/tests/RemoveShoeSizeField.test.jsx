import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Shoes from '../Shoes/Shoes';

test('removes a shoe size field when remove button is clicked', () => {
  render(<Shoes numberOfPlayers={4} />);
  const removeButtons = screen.getAllByText(/remove/i);

  fireEvent.click(removeButtons[0]);

  const shoeSizeFields = screen.getAllByLabelText(/shoe size/i);
  expect(shoeSizeFields).toHaveLength(3);
});
