import { render, screen, waitFor } from '@testing-library/react';
import App from '../../src/App';

test('muestra productos mockeados por la API', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('Café')).toBeInTheDocument();
  });

  const items = screen.getAllByRole('listitem');
  expect(items.length).toBeGreaterThan(0);
});