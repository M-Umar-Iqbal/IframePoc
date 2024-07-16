import { BsFillExclamationCircleFill } from 'react-icons/bs';
// eslint-disable-next-line react/prop-types
const MessageBanner = ({title, bg, txtColor}) => {
  return (
    <div
      style={{
        backgroundColor: bg,
        color: txtColor,
        fontWeight: "600",
        padding: "15px 30px",
        margin: "20px 10px",
        borderRadius: "25px",
        display: "inline-block",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
        border: "2px solid #FFF",
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'
        e.currentTarget.style.cursor = 'pointer'
      }}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ display: "inline-block", marginRight: "15px" }}>
          <BsFillExclamationCircleFill size={24} />
        </span>
        <span style={{ fontSize: "18px" }}>{title}</span>
      </div>
    </div>
  );
};

export default MessageBanner;