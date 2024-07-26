import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
  const containerStyle = {
    display: 'flex',
    height: '300px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #00b09b, #96c93d)',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
  };

  const iconStyle = {
    fontSize: '100px',
    marginBottom: '20px',
  };

  const headerStyle = {
    fontSize: '36px',
    marginBottom: '10px',
  };

  const paragraphStyle = {
    fontSize: '18px',
    maxWidth: '600px',
    lineHeight: '1.5',
  };

  return (
    <div style={containerStyle}>
      <FaCheckCircle style={iconStyle} />
      <h1 style={headerStyle}>Payment Successful!</h1>
      <p style={paragraphStyle}>
        Thank you for your payment. Your transaction was successful. You will receive a confirmation email shortly.
      </p>
    </div>
  );
};

export default PaymentSuccess;
