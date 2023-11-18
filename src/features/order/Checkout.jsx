import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, calculateTotalByProperty } from '../cart/cartSlice';
import { placeOrder } from '../order/orderSlice';

import { generateRandomID } from '../../utils/helpers';

import Button from '../../ui/Common/Button/Button';

import styles from './Order.module.css';

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => state.authentication.user);
  const cartItems = useSelector(state => state.cart.cartItems);

  const cartLength = cartItems.length;

  const totalQuantity = useSelector(calculateTotalByProperty('quantity'));
  const subtotal = useSelector(calculateTotalByProperty('totalPrice'));

  const [fullName, setFullName] = useState(user?.name);
  const [mainAddress, setMainAddress] = useState(user?.address);
  const [mainCard, setMainCard] = useState(user?.cardNum);
  const [mainCvv, setMainCvv] = useState(user?.cvv);
  const [mainExpDate, setMainExpDate] = useState(user?.expDate);

  useEffect(() => {
    if (cartLength < 1) navigate(-1);
  }, [cartLength, navigate]);

  if (cartLength < 1) return;

  function handleCheckout(e) {
    e.preventDefault();

    const customerDetails = {
      fullName,
      mainAddress,
      mainCard,
      mainCvv,
      mainExpDate,
    };

    if (Object.values(customerDetails).some(field => !field)) {
      return;
    }

    const item = {
      id: generateRandomID(),
      subtotal,
      orderedItems: [...cartItems],
      customerDetails,
    };

    dispatch(placeOrder(item));

    alert(`Order placed successfully! Order number: ${item.id}`);
    navigate('/');
    dispatch(clearCart());
  }

  return (
    <main className="p-5">
      <div className="container">
        <h2 className="heading-primary">
          Checkout ({totalQuantity} {totalQuantity > 1 ? 'items' : 'item'})
        </h2>

        <form className={styles.checkout} onSubmit={handleCheckout}>
          <div className={styles.checkoutSection}>
            <h3>Full Name</h3>
            <input
              className={styles.singleInput}
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          </div>
          <div className={styles.checkoutSection}>
            <h3>Delivery Address</h3>
            <input
              className={styles.singleInput}
              type="text"
              value={mainAddress}
              onChange={e => setMainAddress(e.target.value)}
            />
          </div>
          <div className={styles.checkoutSection}>
            <h3>Cart Details</h3>
            <input
              className={styles.singleInput}
              type="text"
              value={mainCard}
              onChange={e => setMainCard(+e.target.value)}
            />
            <div className={styles.doubleInput}>
              <input
                type="text"
                value={mainCvv}
                onChange={e => setMainCvv(+e.target.value)}
              />
              <input
                type="text"
                value={mainExpDate}
                onChange={e => setMainExpDate(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.checkoutActions}>
            <Button type="primary" onClick={() => navigate('/cart')}>
              Go back
            </Button>
            <Button type="primary">Place order</Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Checkout;
