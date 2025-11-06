
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';

test('elimina solo un ítem', async () => {
  render(<App />);
  await screen.findByText('Café');

  const add = screen.getAllByRole('button', { name: /agregar/i })[0];
  await userEvent.click(add);
  await userEvent.click(add);

  const remove = screen.getAllByRole('button', { name: /eliminar/i })[0];
  await userEvent.click(remove);

  expect(screen.getByText('Total: $150')).toBeInTheDocument();
});