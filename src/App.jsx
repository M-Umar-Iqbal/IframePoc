import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';
import DatePicker from 'react-datepicker';
import { BsFillFunnelFill } from "react-icons/bs";
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast';

import EmailStatsDoughnutChart from './components/graphs/CircularAnalyticsGraph';
import { transformCounterAnalyticsResponseObject, transformEmailAnalyticsResponseObject } from './utils/client-utils';
import MessageBanner from './components/common/MessageBanner';
import Loader from './components/common/Loader';
import AppButton from './components/common/AppButton';
import CircularCountGraph from './components/graphs/CircularCountGraph';

function App() {
  const [counterAnalyticsData, setCounterAnalyticsData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [emailAnalyticsLoading, setEmailAnalyticsLoading] = useState(false);
  const [counterGraphLoading, setCounterGraphLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return
    }
    fetchEmailAnalytics(selectedDate, true);
    fetchCounterAnalytics("");
    const intervalId = setInterval(() => {
      fetchEmailAnalytics(selectedDate, false);
    }, 60000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEmailAnalytics = async (date, showLoader = false) => {
    try {
      showLoader && setEmailAnalyticsLoading(true);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const response = await axios.get(`http://localhost:3000/api/fetch-data?month=${month}&year=${year}`);
      if (response?.data) {
        setAnalyticsData(response.data["SafeToSend Status"]);
      }
    } catch (err) {
      console.log("📌 ~ fetchEmailAnalytics ~ err: ", err);
      setAnalyticsData([]);
      toast.error("Unable to fetch safeToSend analytics")
    } finally {
      showLoader && setEmailAnalyticsLoading(false);
    }
  };

  const fetchCounterAnalytics = async (type) => {
    try {
      setCounterGraphLoading(true);
      const response = await axios.get(`http://localhost:3000/dashboardApi/update-dashboard?type=${type}`);
      if (response?.data?.Dashboard) {
        setCounterAnalyticsData(response.data.Dashboard);
      }
      toast.success('Counter updated successfully.');
    } catch (err) {
      console.log("📌 ~ handleAPICall ~ err: ", err);
      toast.error('Failed to update counter data');
    } finally {
      setCounterGraphLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchEmailAnalytics(date, true);
  };

  const { safetosend, valid, invalid, trap, total } = transformEmailAnalyticsResponseObject(analyticsData);
  const { success_total_count, reject_total_count, no_response_total_count, total_count } = transformCounterAnalyticsResponseObject(counterAnalyticsData);

  return (
    <>
      <Toaster />
      <div style={{ padding: "0 30px", marginTop: "10px" }}>
        <div>
          <h1>POC 1</h1>
          <div style={{
            display: "flex", padding: "10px 20px", alignItems: "center", borderRadius: "12px", backgroundColor: "#ffffff",
            margin: "15px 0",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}>
            <div style={{
              marginRight: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}> <BsFillFunnelFill size={20} style={{ paddingTop: "3px", marginRight: "5px" }} /><h3>Filter Analytics for selected month:</h3>
            </div>
            <DatePicker
              className='date-picker'
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="M/yyyy"
              disabled={emailAnalyticsLoading}
              showMonthYearPicker
            />
          </div>
          {emailAnalyticsLoading ? <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "70vh" }}>
              <Loader />
            </div>
          </div> : <div
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              minWidth: "600px",
              padding: "30px",
              minHeight: "fit-content",
              borderRadius: "20px",
              fontFamily: "'Helvetica Neue', 'Arial', 'sans-serif'",
              color: "#333",
            }}>
            {!isEmpty(analyticsData) ? (
              <EmailStatsDoughnutChart
                total={total}
                safetosend={safetosend}
                valid={valid}
                invalid={invalid}
                trap={trap}
              />
            ) : (
              <MessageBanner title={"No SafeToSend Email analytics found!"} bg={"#FF6F6F"} txtColor={"#FFFFFF"} />
            )}
          </div>}
        </div>
        <div>
          <h1>POC 2</h1>
          <div style={{
            display: "flex",
            padding: "20px 20px", alignItems: "center",
            borderRadius: "12px", backgroundColor: "#ffffff",
            margin: "15px 0",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}>
            <AppButton disabled={counterGraphLoading} title={"Success"} color={"success"} onClickCallback={() => { fetchCounterAnalytics('success') }} />
            <AppButton disabled={counterGraphLoading} title={"Failure"} color={"error"} onClickCallback={() => { fetchCounterAnalytics('reject') }} />
            <AppButton disabled={counterGraphLoading} title={"No Response"} color={"secondary"} onClickCallback={() => { fetchCounterAnalytics('noResponse') }} />
          </div>
          {counterGraphLoading ? <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "70vh" }}>
              <Loader />
            </div>
          </div> : <div
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              minWidth: "600px",
              padding: "30px",
              minHeight: "fit-content",
              borderRadius: "20px",
              fontFamily: "'Helvetica Neue', 'Arial', 'sans-serif'",
              color: "#333",
              margin: "15px 0"
            }}>
            {!isEmpty(counterAnalyticsData) ? (
              <CircularCountGraph noResponse={no_response_total_count} reject={reject_total_count} success={success_total_count} total={total_count} />
            ) : (
              <MessageBanner title={"No Counter Data found!"} bg={"#FF6F6F"} txtColor={"#FFFFFF"} />
            )}
          </div>}
        </div>
      </div>
    </>
  );
}

export default App;