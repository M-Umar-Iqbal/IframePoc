import { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { isEmpty } from 'lodash';

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
    <div style={{padding: "20px", marginTop: "10px"}}>
      {loading ? <Loader /> :
        <>
          {!isEmpty(analyticsData) ? <EmailStatsDoughnutChart
            total={total}
            safetosend={safetosend}
            valid={valid}
            invalid={invalid}
            trap={trap}
          /> : <div
            style={{
              backgroundColor: "#FF8D8D",
              color: "black",
              fontWeight: "600",
              padding: "10px 20px",
              margin: "10px",
              borderRadius: "20px",
              display: "inline-block",
              boxShadow: "7px 5px"
            }}>
            <div style={{ display: "flex" }}>
              <span style={{ display: "inline-block", marginRight: "5px", paddingTop: "4px" }}><BsFillExclamationCircleFill size={20} /></span>
              <span style={{ padding: "4px 0" }}>No Safe2Send analytics found!</span>
            </div>
          </div>}
        </>
      }
    </div>
  )
}

export default App;
