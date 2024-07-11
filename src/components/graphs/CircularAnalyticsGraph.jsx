/* eslint-disable react/prop-types */
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const EmailStatsDoughnutChart = ({ total, safetosend, valid, invalid, trap }) => {
  const data = {
    labels: ['Safe to Send', 'Valid', 'Invalid', 'Trap'],
    datasets: [{
      label: 'Email Stats',
      data: [safetosend, valid, invalid, trap],
      backgroundColor: ['#4caf50', '#8bc34a', '#f44336', '#ff9800'],
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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: 400, marginRight: 20 }}>
        <Doughnut data={data} options={options} />
      </div>
      <div>
        <div style={{ fontSize: 24, marginBottom: 10 }}>Total {total}</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 20, height: 20, backgroundColor: '#4caf50', marginRight: 10 }}></div>
          <div>Safe to Send: {safetosend} ({((safetosend / total) * 100).toFixed(2)}%)</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
          <div style={{ width: 20, height: 20, backgroundColor: '#8bc34a', marginRight: 10 }}></div>
          <div>Valid: {valid} ({((valid / total) * 100).toFixed(2)}%)</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
          <div style={{ width: 20, height: 20, backgroundColor: '#f44336', marginRight: 10 }}></div>
          <div>Invalid: {invalid} ({((invalid / total) * 100).toFixed(2)}%)</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
          <div style={{ width: 20, height: 20, backgroundColor: '#ff9800', marginRight: 10 }}></div>
          <div>Trap: {trap} ({((trap / total) * 100).toFixed(2)}%)</div>
        </div>
      </div>
    </div>
  );
};

export default EmailStatsDoughnutChart;
