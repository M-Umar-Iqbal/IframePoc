import PropTypes from 'prop-types';

const AppButton = ({ bg, txtColor, title, disabled, onClickCallback }) => {
  return (
    <button
      className={disabled ? "" : "app-btn"}
      style={{
        backgroundColor: bg || '#007BFF',
        color: txtColor || '#FFFFFF',
        marginRight: '7px',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        borderRadius: '12px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        opacity: disabled ? 0.6 : 1,
      }}
      disabled={disabled}
      onClick={onClickCallback}
    >
      {title}
    </button>
  );
};

AppButton.propTypes = {
  bg: PropTypes.string,
  txtColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClickCallback: PropTypes.func.isRequired,
};

export default AppButton;
