import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';

// eslint-disable-next-line react/prop-types
function AtDataAnalyticsGraph({ valid = 0, serverError = 0, noResponse = 0 }) {
    const total = valid + serverError + noResponse;
    const data = {
        labels: ['Valid', 'Server Error', 'No Response'],
        datasets: [{
            label: 'Email Stats',
            data: [valid, serverError, noResponse],
            backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
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
        <div
            style={{
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
                At Data Analytics
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', }}>
                <div style={{
                    width: 300,
                    height: 300,
                    marginRight: 40,
                }}>
                    <Doughnut data={data} options={options} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
                        <div style={{ width: 20, height: 20, backgroundColor: '#8bc34a', marginRight: 10, borderRadius: "3px" }}></div>
                        <div><b>Valid:</b> {valid} ({((valid / total) * 100).toFixed(2)}%)</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
                        <div style={{ width: 20, height: 20, backgroundColor: '#f44336', marginRight: 10, borderRadius: "3px" }}></div>
                        <div><b>Server Error:</b> {serverError} ({((serverError / total) * 100).toFixed(2)}%)</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
                        <div style={{ width: 20, height: 20, backgroundColor: '#ff9800', marginRight: 10, borderRadius: "3px" }}></div>
                        <div><b>No Response:</b> {noResponse} ({((noResponse / total) * 100).toFixed(2)}%)</div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AtDataAnalyticsGraph