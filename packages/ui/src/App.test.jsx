import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../app';

describe('App Component', () => {
  test('renders the app heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /react app/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders the welcome message', () => {
    render(<App />);
    const message = screen.getByText(/welcome/i);
    expect(message).toBeInTheDocument();
  });
});
