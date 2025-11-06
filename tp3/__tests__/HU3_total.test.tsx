
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';

test('calcula total correctamente', async () => {
  render(<App />);
  await screen.findByText('Café');

  const add = screen.getAllByRole('button', { name: /agregar/i })[0];
  await userEvent.click(add);
  await userEvent.click(add);

  expect(screen.getByText('Total: $300')).toBeInTheDocument();
});