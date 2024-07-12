import { BsFillExclamationCircleFill } from 'react-icons/bs';

// eslint-disable-next-line react/prop-types
const ErrorMessage = ({title}) => {
  return (
    <div
      style={{
        backgroundColor: "#FF6F6F",
        color: "white",
        fontWeight: "600",
        padding: "10px 20px",
        margin: "10px",
        borderRadius: "20px",
        display: "inline-block",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ display: "inline-block", marginRight: "10px" }}>
          <BsFillExclamationCircleFill size={20} />
        </span>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
