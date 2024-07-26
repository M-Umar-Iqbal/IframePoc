import '../../assets/styles/Navbar.css';
import rocketlyLogo from '../../assets/images/rocketly_logo.png';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const route = useLocation();
  return (
    <div className="navbar">
      <div className='nav-container'>
        <a href="/" className="logo-container">
          <img width={150} src={rocketlyLogo} />
        </a>
        <div className='links-container'>
          <Link className={`link ${route.pathname === '/' ? 'active' : ''}`} to="/">
            Dashboard
          </Link>
          <Link className={`link ${route.pathname === '/services' ? 'active' : ''}`} to="/services">
            Services
          </Link>
          <Link className={`link ${route.pathname === '/services-validations' ? 'active' : ''}`} to="/services-validations">
            Validate Services
          </Link>
          <Link className={`link ${route.pathname === '/checkout' ? 'active' : ''}`} to="/checkout">
            POC 1
          </Link>
          <Link className={`link ${route.pathname === '/payment-via-stripe' ? 'active' : ''}`} to="/payment-via-stripe">
            POC 2
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
