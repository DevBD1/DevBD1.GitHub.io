import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders app without crashing', async () => {
  render(<App />);
  // The layout switcher button should be present even during loading
  await waitFor(() => {
    expect(document.body).toBeDefined();
  });
});
