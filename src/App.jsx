import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';

import EmailStatsDoughnutChart from './components/graphs/CircularAnalyticsGraph';
import { transformResponseObject } from './utils/client-utils';
import ErrorMessage from './components/common/ErrorBanner';
import Loader from './components/common/Loader';

function App() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (isInitialLoad.current) {
        setLoading(true); // Show loader only during initial load
      }
      try {
        const response = await axios.get("http://localhost:3000/api/fetch-data");
        if (response?.data) {
          setAnalyticsData(response.data["SafeToSend Status"]);
        }
      } catch (err) {
        console.log("📌 ~ fetchAnalytics ~ err: ", err);
      } finally {
        if (isInitialLoad.current) {
          setLoading(false); // Hide loader after initial load
          isInitialLoad.current = false; // Set ref to false after initial load
        }
      }
    };

    fetchAnalytics(); // Initial fetch

    const intervalId = setInterval(fetchAnalytics, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const { safetosend, valid, invalid, trap, total } = transformResponseObject(analyticsData);

  return (
    <div style={{ padding: "20px", marginTop: "10px" }}>
      {loading ? (
        <div style={{ display: 'flex', alignItems: "center" }}>
          <h3 style={{ marginRight: "10px" }}>Loading </h3>
          <Loader />
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
