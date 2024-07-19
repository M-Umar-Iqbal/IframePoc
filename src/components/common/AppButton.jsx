import PropTypes from 'prop-types';

const AppButton = ({ style, title, disabled, onClickCallback, icon }) => {
  return (
    <button
      className={disabled ? "" : "app-btn"}
      style={{
        marginRight: '2px',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        borderRadius: '12px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        opacity: disabled ? 0.6 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        ...style
      }}
      disabled={disabled}
      onClick={onClickCallback}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
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
  icon: PropTypes.node,
  style: PropTypes.any
};

export default AppButton;
