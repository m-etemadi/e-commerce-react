import Logo from '../Common/Logo/Logo';
import Navbar from '../Navbar/Navbar';
import UserActions from '../Navbar/UserActions';

import styles from './Header.module.css';

function Header() {
  return (
    <header className={`${styles.header} p-2`}>
      <div className={styles.container}>
        <Logo />
        <Navbar />
        <UserActions />
      </div>
    </header>
  );
}

export default Header;