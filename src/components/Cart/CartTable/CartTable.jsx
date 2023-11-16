import { useCart } from '../../../contexts/CartContext';

import CartTableHeader from './CartTableHeader';
import CartTableRow from './CartTableRow';

function CartTable() {
  const { cartItems } = useCart();

  return (
    <div className="table">
      <CartTableHeader />

      {cartItems.map(item => (
        <CartTableRow key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CartTable;
