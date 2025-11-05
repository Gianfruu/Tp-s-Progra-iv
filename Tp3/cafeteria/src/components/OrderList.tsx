import { useOrder } from '../hooks/useOrder';

const OrderList = () => {
  const { order, removeItem } = useOrder();

  return (
    <ul role="list">
      {order.map(item => (
        <li key={item.id}>
          {item.name} - ${item.price}
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeItem(item.id);
            }}
          >
            Eliminar {item.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default OrderList;
