import { render, screen, fireEvent } from '@testing-library/react';
import { OrderProvider } from '../../context/OrderProvider';
import Product from '../../components/Product';
import { OrderTotal } from '../../components/OrderTotal';

describe('Calcular precio total', () => {
  test('calcula el precio total agregando mas de un producto', () => {
    render(
      <OrderProvider>
        <Product id={1} name="Café" price={100} />
        <Product id={2} name="Té" price={50} />
        <OrderTotal />
      </OrderProvider>
    );

    // Agrego dos productos
    const cafeButton = screen.getByText('Agregar Café');
    fireEvent.click(cafeButton); 

    const teButton = screen.getByText('Agregar Té');
    fireEvent.click(teButton); 

    expect(screen.getByText(/total: \$150/i)).toBeInTheDocument();
  });
});
