import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

// eslint-disable-next-line react/prop-types
const CircularCountGraph = ({ success, reject, noResponse, total }) => {
  const data = {
    labels: ['Success', 'Reject', 'No Response'],
    datasets: [{
      label: 'Email Stats',
      data: [success, reject, noResponse],
      backgroundColor: ['#81FF9A', '#f44336', '#567371'],
      hoverOffset: 4,
    }],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      display: "inline-block",
      minWidth: "600px",
      minHeight: "250px",
      padding: "30px",
      borderRadius: "20px",
      color: "#333",
    }}>
      <h3
        style={{
          marginTop: 0,
          marginBottom: "20px",
          fontWeight: "700",
          textAlign: "center",
          color: "#fff",
          backgroundColor: "#000",
          padding: "15px 0",
          borderRadius: "20px"
        }
        }>
        Status Counter Analytics
      </h3>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          width: 300,
          height: 300,
          marginRight: 40,
        }}>
          <Doughnut data={data} options={options} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "20px", marginBottom: "15px" }}><b>Total</b> {total}</div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
            <div style={{ width: 20, height: 20, backgroundColor: '#81FF9A', marginRight: 10, borderRadius: "3px" }}></div>
            <div><b>Success:</b> {success} ({((success / total) * 100).toFixed(2)}%)</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
            <div style={{ width: 20, height: 20, backgroundColor: '#f44336', marginRight: 10, borderRadius: "3px" }}></div>
            <div><b>Reject:</b> {reject} ({((reject / total) * 100).toFixed(2)}%)</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
            <div style={{ width: 20, height: 20, backgroundColor: '#567371', marginRight: 10, borderRadius: "3px" }}></div>
            <div><b>No-Response:</b> {noResponse} ({((noResponse / total) * 100).toFixed(2)}%)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularCountGraph;