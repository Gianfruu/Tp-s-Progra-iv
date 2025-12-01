
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';

test('agrega productos al pedido', async () => {
  render(<App />);
  await screen.findByText('Café');

  await userEvent.click(screen.getAllByRole('button', { name: /agregar/i })[0]);

  const orderList = screen.getByRole('list', { name: /pedido/i });
  expect(orderList).toBeInTheDocument();
  expect(screen.getByText('Café')).toBeInTheDocument();
});