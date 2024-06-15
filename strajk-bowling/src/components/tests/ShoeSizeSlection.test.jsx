import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Shoes from '../Shoes/Shoes';

test('has a shoe size field for each player', () => {
  render(<Shoes numberOfPlayers={4} />);
  const shoeSizeFields = screen.getAllByLabelText(/shoe size/i);

  expect(shoeSizeFields).toHaveLength(4);
});

test('shoe size field is required for each player', () => {
  render(<Shoes numberOfPlayers={4} />);
  const shoeSizeFields = screen.getAllByLabelText(/shoe size/i);

  shoeSizeFields.forEach(field => {
    expect(field).toBeRequired();
  });
});
