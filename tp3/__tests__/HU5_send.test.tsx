
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';

test('envia pedido y confirma', async () => {
  render(<App />);
  await screen.findByText('Café');

  const agregar = screen.getAllByRole('button', { name: /Agregar/i })[0];
  await userEvent.click(agregar);

  const enviar = screen.getByRole('button', { name: /Enviar pedido/i });
  await userEvent.click(enviar);

  await screen.findByText(/Pedido confirmado/i);

  expect(screen.getByText('Total: $0')).toBeInTheDocument();
});