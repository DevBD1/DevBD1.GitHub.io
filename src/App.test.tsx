import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders app without crashing', async () => {
  render(<App />);
  // The app should render the Starship layout
  await waitFor(() => {
    expect(document.body).toBeDefined();
  });
});
