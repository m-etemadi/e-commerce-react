import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './Login.module.css';
import { login } from '../../features/login/authenticationSlice';
import Button from '../../ui/Common/Button/Button';

function Login() {
  const [email, setEmail] = useState('john@ecommerce.com');
  const [password, setPassword] = useState('John1234');

  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault();

    if (email && password) dispatch(login(email, password));
  }
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isAuthenticated = useSelector(
    state => state.authentication.isAuthenticated
  );

  const destination = searchParams.get('destination');

  useEffect(
    function () {
      if (isAuthenticated) {
        destination
          ? navigate('/order/checkout', { replace: true })
          : navigate('/', { replace: true });
      }
    },
    [isAuthenticated, navigate, destination]
  );

  return (
    <main className="p-5">
      <div className="container">
        <h2 className="heading-primary">Login</h2>
        <div className={styles.login}>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <Button type="primary">Continue</Button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;