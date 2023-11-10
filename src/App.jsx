import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShoppingProvider } from './contexts/ShoppingContext';
import { AuthProvider } from './contexts/FakeAuthContext';

import Navbar from './components/common/Navbar/Navbar';
import Products from './pages/Products/Product';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Cart from './pages/Cart/Cart';
import Order from './pages/Order/Order';
import Checkout from './pages/Order/Checkout';
import OrderSuccess from './pages/Order/OrderSuccess';
import ProtectedRoute from './route/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ShoppingProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="cart" element={<Cart />} />

            <Route
              path="order"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            >
              <Route index element={<Checkout />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-success" element={<OrderSuccess />} />
              <Route path="order-success/:orderId" element={<OrderSuccess />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ShoppingProvider>
    </AuthProvider>
  );
}

export default App;
