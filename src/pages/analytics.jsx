import {
    useEffect,
    // useRef,
    useState
} from 'react'
// import DatePicker from 'react-datepicker'
import toast from 'react-hot-toast';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
// import { BsFillFunnelFill } from 'react-icons/bs';
import { isEmpty } from 'lodash';
import { Typography } from '@mui/material';
import {
    transformCounterAnalyticsResponseObject,
    // transformEmailAnalyticsResponseObject 
} from '../utils/client-utils';
import Loader from '../components/common/Loader';
// import EmailStatsDoughnutChart from '../components/graphs/CircularAnalyticsGraph';
import MessageBanner from '../components/common/MessageBanner';
import AppButton from '../components/common/AppButton';
import CircularCountGraph from '../components/graphs/CircularCountGraph';


function Analytics() {
    const [counterAnalyticsData, setCounterAnalyticsData] = useState([]);
    // const [analyticsData, setAnalyticsData] = useState([]);
    // const [emailAnalyticsLoading, setEmailAnalyticsLoading] = useState(false);
    const [counterGraphLoading, setCounterGraphLoading] = useState(false);
    // const today = new Date();
    // const [selectedDate, setSelectedDate] = useState(new Date());
    // const selectedDateRef = useRef(selectedDate);

    useEffect(() => {
        // fetchEmailAnalytics(selectedDate, true);
        fetchCounterAnalytics('');
        // const intervalId = setInterval(async () => {
        //     await fetchEmailAnalytics(selectedDateRef.current, false);
        // }, 60000);

        // return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     selectedDateRef.current = selectedDate;
    // }, [selectedDate]);

    // const fetchEmailAnalytics = async (date, showLoader = false) => {
    //     try {
    //         showLoader && setEmailAnalyticsLoading(true);
    //         const month = date.getMonth() + 1;
    //         const year = date.getFullYear();
    //         const response = await axios.get(`https://rocketly-dev.hpdemos.co/api/fetch-data?month=${month}&year=${year}`);
    //         if (response?.data) {
    //             setAnalyticsData(response.data['SafeToSend Status']);
    //         }
    //     } catch (err) {
    //         console.log('📌 ~ fetchEmailAnalytics ~ err: ', err);
    //         setAnalyticsData([]);
    //         toast.error('Unable to fetch safeToSend analytics')
    //     } finally {
    //         showLoader && setEmailAnalyticsLoading(false);
    //     }
    // };

    const fetchCounterAnalytics = async (type) => {
        try {
            setCounterGraphLoading(true);
            const response = await axios.get(`https://rocketly-dev.hpdemos.co/v2/dashboardApi/update-dashboard?type=${type}`);
            if (response?.data?.Dashboard) {
                setCounterAnalyticsData(response.data.Dashboard);
            }
        } catch (err) {
            console.log('📌 ~ handleAPICall ~ err: ', err);
            toast.error('Failed to update counter data');
        } finally {
            setCounterGraphLoading(false);
        }
    };

    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    //     fetchEmailAnalytics(date, true);
    // };

    // const { safetosend, valid, invalid, trap, total } = transformEmailAnalyticsResponseObject(analyticsData);
    const { success_total_count, reject_total_count, no_response_total_count, total_count } = transformCounterAnalyticsResponseObject(counterAnalyticsData);
    return (
        <>
            {/* <div>
                <h1>POC 1</h1>
                <div style={{
                    display: 'flex', padding: '10px 20px', alignItems: 'center', borderRadius: '12px', backgroundColor: '#ffffff',
                    margin: '15px 0',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}>
                    <div style={{
                        marginRight: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}> <BsFillFunnelFill size={20} style={{ paddingTop: '3px', marginRight: '5px' }} /><h3>Filter Analytics for selected month:</h3>
                    </div>
                    <DatePicker
                        className='date-picker'
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat='M/yyyy'
                        maxDate={today}
                        disabled={emailAnalyticsLoading}
                        showMonthYearPicker
                    />
                </div>
                <div style={{ position: 'relative' }}>
                    {(
                        <div
                            style={{
                                backgroundColor: '#ffffff',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                minWidth: '600px',
                                padding: '30px',
                                minHeight: 'fit-content',
                                borderRadius: '20px',
                                fontFamily: ''Helvetica Neue', 'Arial', 'sans-serif'',
                                color: '#333',
                                position: 'relative'
                            }}>
                            {emailAnalyticsLoading && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 1
                                }}>
                                    <Loader />
                                </div>
                            )}
                            {!isEmpty(analyticsData) ? (
                                <EmailStatsDoughnutChart
                                    total={total}
                                    safetosend={safetosend}
                                    valid={valid}
                                    invalid={invalid}
                                    trap={trap}
                                />
                            ) : (
                                emailAnalyticsLoading ?
                                    <div style={{ height: '400px' }} />
                                    : <MessageBanner title={'No SafeToSend Email analytics found!'} bg={'#FF6F6F'} txtColor={'#FFFFFF'} />
                            )}
                        </div>
                    )}
                </div>
            </div> */}
            <div style={{ marginTop: '20px', padding: '20px' }}>
                <div style={{ margin: '20px 0' }}>
                    <Typography variant='h3'>Counter Analytics</Typography>
                </div>
                <hr />
                <div style={{
                    display: 'flex',
                    padding: '20px 20px', alignItems: 'center',
                    borderRadius: '12px', backgroundColor: '#ffffff',
                    margin: '15px 0',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}>
                    <AppButton
                        style={{
                            backgroundColor: '#81FB9B',
                            color: '#000000',
                        }}
                        disabled={counterGraphLoading}
                        title={'Success'}
                        onClickCallback={() => { fetchCounterAnalytics('success') }}
                    />
                    <AppButton
                        style={{
                            backgroundColor: '#F44336',
                            color: '#FFFFFF'
                        }}
                        disabled={counterGraphLoading} title={'Failure'} onClickCallback={() => { fetchCounterAnalytics('reject') }} />
                    <AppButton
                        style={{
                            backgroundColor: '#567371',
                            color: '#FFFFFF'
                        }}
                        disabled={counterGraphLoading} title={'No Response'} onClickCallback={() => { fetchCounterAnalytics('noResponse') }} />
                </div>
                <div style={{ position: 'relative' }}>
                    {(
                        <div
                            style={{
                                backgroundColor: '#ffffff',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                minWidth: '600px',
                                padding: '30px',
                                minHeight: 'fit-content',
                                borderRadius: '20px',
                                color: '#333',
                                position: 'relative'
                            }}>
                            {counterGraphLoading && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 1
                                }}>
                                    <Loader />
                                </div>
                            )}
                            {!isEmpty(counterAnalyticsData) ? (
                                <CircularCountGraph noResponse={no_response_total_count} reject={reject_total_count} success={success_total_count} total={total_count} />
                            ) : (
                                counterGraphLoading ?
                                    <div style={{ height: '400px' }} />
                                    : <MessageBanner title={'No Counter Data found!'} bg={'#FF6F6F'} txtColor={'#FFFFFF'} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Analytics