import { useOrder } from '../hooks/useOrder';

type ProductProps = {
  id: number;
  name: string;
  price: number;
};

const Product = ({ id, name, price }: ProductProps) => {
  const { addItem } = useOrder();

  return (
    <div>
      <h3>{name}</h3>
      <button onClick={() => addItem({id, name, price})}>
        Agregar {name}
      </button>
    </div>
  );
};

export default Product;
