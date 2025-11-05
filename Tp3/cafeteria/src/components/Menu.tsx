import { useEffect, useState } from 'react';
import type { Product } from '../types/Product';

export const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/menu')

      .then(res => {
        if(!res.ok){
          throw new Error('Error al obtener el menú');
        }
        return res.json()
      })

      .then((data: Product[]) => {
        if (!data || data.length === 0) {
          setError('No hay productos disponibles')
          return
        }
        setProducts(data)
      })

      .catch(err => {
        setError(err?.message || 'Error al obtener el menú')
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name} - ${product.price}</li>
      ))}
    </ul>
  );
};
