import { useEffect, useState } from 'react';
import axios from 'axios';

import EmailStatsDoughnutChart from './components/graphs/CircularAnalyticsGraph';
import { transformResponseObject } from './utils/client-utils';
import Loader from './components/common/Loader';

function App() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/fetch-data");
        if (response?.data) {
          setAnalyticsData(response.data["SafeToSend Status"]);
        }
      } catch (err) {
        console.log("📌 ~ fetchAnalytics ~ err: ", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  const { safetosend, valid, invalid, trap, total } = transformResponseObject(analyticsData);
  return (
    <div className="card">
      {loading ? <Loader /> :
        <EmailStatsDoughnutChart
          total={total}
          safetosend={safetosend}
          valid={valid}
          invalid={invalid}
          trap={trap}
        />}
    </div>
  )
}

export default App;
