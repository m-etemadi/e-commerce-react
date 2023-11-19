import { Link, useNavigate } from 'react-router-dom';

import { useCart } from '../../../contexts/CartContext';
import { useAuth } from '../../../contexts/FakeAuthContext';
import { calculateTotalByProperty } from '../../../utils/helpers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import styles from './userActions.module.css';

function UserActions() {
  const { cartItems, clearCart } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const cartLength = cartItems.length;
  const totalQuantity = calculateTotalByProperty(cartItems, 'quantity');

  function handleLogout() {
    clearCart();
    logout();
    navigate('/');
  }

  return (
    <ul className={styles.userActions}>
      {!isAuthenticated ? (
        <li>
          <Link title="Login" to="login">
            Login
          </Link>
        </li>
      ) : (
        <li>
          <Link title="Logout" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      )}

      <li>
        <Link title="Cart" to="cart">
          {cartLength > 0 && (
            <span className={styles.badge}>
              {totalQuantity > 9 ? '+10' : totalQuantity}
            </span>
          )}
          <FontAwesomeIcon icon={faShoppingCart} size="xl" />
        </Link>
      </li>
    </ul>
  );
}

export default UserActions;