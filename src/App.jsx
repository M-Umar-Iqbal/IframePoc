import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

import Navbar from './components/layout/Navbar';
import Analytics from './pages/analytics';
import Services from './pages/services';
import Checkout from './pages/checkout';
import { getAllQueryParams } from './utils/client-utils';
import appConfig from './utils/constants';
import localStorageUtils from './utils/local-storage-utils';
import PaymentSuccess from './pages/payment-success';
import ServicesValidations from './pages/services-validations';

function App() {
  const params = getAllQueryParams();
  const { accEmail = "", accId = "" } = params;
  const baseURL = appConfig?.services?.baseURL;

  useEffect(() => {
    localStorageUtils.clear();
    if (!accEmail || !accId) return;
    const createUser = async () => {
      // This method will create new user in our DB if the user wasn't there previously.
      const payload = {
        subAccountName: accEmail,
        subAccountId: accId
      }
      localStorageUtils.setItem('accEmail', accEmail);
      localStorageUtils.setItem('accId', accId);
      try {
        const response = await axios.post(`${baseURL}/v2/user/createUser`, payload);
        console.log(response.data.payload.data);
      } catch (err) {
        console.log("📌 ~ createUser ~ err: ", err);
      }
    }
    createUser();
  }, []);

  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Analytics />} />
        <Route path="/services" element={<Services />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/services-validations" element={<ServicesValidations />} />

      </Routes>
    </>
  );
}

export default App;