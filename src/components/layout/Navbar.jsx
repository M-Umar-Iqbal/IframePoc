import '../../assets/styles/Navbar.css';
import rocketlyLogo from '../../assets/images/rocketly_logo.png';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const route = useLocation();
  return (
    <div className="navbar">
      <div className='nav-container'>
        <div href="/" className="logo-container">
          <img width={150} src={rocketlyLogo} />
        </div>
        <div className='links-container'>
          <Link className={`link ${route.pathname === '/' ? 'active' : ''}`} to="/">
            Home
          </Link>
          <Link className={`link ${route.pathname === '/services' ? 'active' : ''}`} to="/services">
            Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
