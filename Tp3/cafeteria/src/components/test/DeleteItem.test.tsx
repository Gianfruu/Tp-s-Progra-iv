import { render, screen, fireEvent } from '@testing-library/react';
import { OrderProvider } from '../../context/OrderProvider';
import Product from '../../components/Product';
import OrderList from '../../components/OrderList';

describe('Eliminar producto del pedido', () => {
  test('elimina solo el producto seleccionado', () => {
    render(
      <OrderProvider>
        <Product id={1} name="Café" price={100} />
        <Product id={2} name="Té" price={50} />
        <OrderList />
      </OrderProvider>
    );

    
    fireEvent.click(screen.getAllByText('Agregar Café')[0]); 
    fireEvent.click(screen.getAllByText('Agregar Té')[0]); 

    expect(screen.getByText('Café - $100')).toBeInTheDocument();
    expect(screen.getByText('Té - $50')).toBeInTheDocument();

    const eliminarCafe = screen.getAllByText('Eliminar Café')[0];
    fireEvent.click(eliminarCafe);

    expect(screen.queryByText('Café - $100')).not.toBeInTheDocument();
    expect(screen.getByText('Té - $50')).toBeInTheDocument();
  });
});
