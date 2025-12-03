import { render, screen, waitFor } from '@testing-library/react';
import { Menu } from '../Menu';

describe('Test menú', () => {
  test('muestra todos los productos del menú', async () => {
    render(<Menu />);

    await waitFor(() => {
      expect(screen.getByText('Café - $500')).toBeInTheDocument();
    });

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  });
});