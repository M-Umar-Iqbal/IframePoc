import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmailStatsDoughnutChart from './components/graphs/CircularAnalyticsGraph';
import { getAllQueryParams, transformResponseObject } from './utils/client-utils';
import ErrorMessage from './components/common/ErrorBanner';
import Loader from './components/common/Loader';

function App() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const isInitialLoad = useRef(true); // Ref to track initial load

  useEffect(() => {
    const fetchAnalytics = async (date) => {
      if (isInitialLoad.current) {
        setLoading(true); // Show loader only during initial load
      }
      try {
        const month = date.getMonth() + 1; // Get the month (0-based index, so add 1)
        const year = date.getFullYear();
        const response = await axios.get(`http://localhost:3000/api/fetch-data?month=${month}&year=${year}`);
        if (response?.data) {
          setAnalyticsData(response.data["SafeToSend Status"]);
        }
      } catch (err) {
        console.log("📌 ~ fetchAnalytics ~ err: ", err);
        setAnalyticsData([]);
      } finally {
        if (isInitialLoad.current) {
          setLoading(false); // Hide loader after initial load
          isInitialLoad.current = false; // Set ref to false after initial load
        }
      }
    };

    fetchAnalytics(selectedDate); // Initial fetch

    const intervalId = setInterval(() => fetchAnalytics(selectedDate), 60000); // Poll every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    isInitialLoad.current = true; // Reset initial load flag to show loader on date change
  };

  const { safetosend, valid, invalid, trap, total } = transformResponseObject(analyticsData);
  const query = getAllQueryParams();
  return (
    <div style={{ padding: "0 30px", marginTop: "10px" }}>
      <p>{JSON.stringify(query)}</p>
      <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", padding: "30px 0" }}>
        <h3 style={{
          marginRight: "5px",
          fontFamily: "'Helvetica Neue', 'Arial', 'sans-serif'",

        }}> Filter Analytics for selected month: </h3>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      </div>
      {loading ? (
        <div style={{ display: 'flex', alignItems: "center" }}>
          <div style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "600px",
            height: "300px",
            padding: "30px",
            borderRadius: "20px",
            fontFamily: "'Helvetica Neue', 'Arial', 'sans-serif'",
            color: "#333",
          }}><Loader /></div>
        </div>
      ) : !isEmpty(analyticsData) ? (
        <EmailStatsDoughnutChart
          total={total}
          safetosend={safetosend}
          valid={valid}
          invalid={invalid}
          trap={trap}
        />
      ) : (
        <ErrorMessage title={"No Safe2Send analytics found!"} />
      )}
    </div>
  );
}

export default App;
