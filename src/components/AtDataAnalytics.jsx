import { useEffect, useState } from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';

import appConfig from '../utils/constants';
import Loader from './common/Loader';
import AtDataAnalyticsGraph from './graphs/AtDataAnalyticsGraph';
import MessageBanner from './common/MessageBanner';

function AtDataAnalytics() {
    const [atDataAnalytics, setAtDataAnalytics] = useState();
    const [loading, setLoading] = useState(false);
    const baseURL = appConfig?.services?.baseURL;

    useEffect(() => {
        const fetchAtDataAnalytics = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${baseURL}/v2/dashboardApi/update-dashboard`);
                const data = response?.data?.payload?.data;
                if (!isEmpty(data)) {
                    setAtDataAnalytics(data?.statusCounts);
                }
            } catch (err) {
                console.log('📌 ~ Fetch AtData Analytics ~ err: ', err);
            } finally {
                setLoading(false)
            }
        }
        fetchAtDataAnalytics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                minWidth: '600px',
                padding: '30px',
                minHeight: 'fit-content',
                borderRadius: '20px',
                position: 'relative',
                marginTop: '20px'
            }}>
            {loading && (
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
            {
                !isEmpty(atDataAnalytics) ?
                    <>
                        <AtDataAnalyticsGraph
                            serverError={atDataAnalytics?.['500']}
                            noResponse={atDataAnalytics?.['400']}
                            valid={atDataAnalytics?.['200']}
                        />
                    </> :
                    loading ?
                        <div style={{ height: '400px' }} />
                        : <MessageBanner title={'No At Data Analytics found!'} bg={'#FF6F6F'} txtColor={'#FFFFFF'} />
            }
        </div>
    )
}

export default AtDataAnalytics