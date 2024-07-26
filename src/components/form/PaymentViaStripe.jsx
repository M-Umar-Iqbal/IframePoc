/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Card } from '@mui/material';

import AppButton from '../common/AppButton';
import appConfig from '../../utils/constants';
import localStorageUtils from '../../utils/local-storage-utils';
import Loader from '../common/Loader';
import PaymentSuccess from '../PaymentSuccess';

export default function PaymentViaStripe({ amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseURL = appConfig?.services?.baseURL;

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  }

  const handleSubmit = async () => {
    const accId = localStorageUtils.getItem('accId');
    if (!stripe || !elements || !accId) {
      toast.error('Unable to do transaction')
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    const payload = {
      subAccountId: accId,
      amount: amount
    }
    setLoading(true);
    const response = await axios.post(`${baseURL}/v2/user/chargeUserviaStripe`, payload);
    const data = response?.data?.payload?.data;
    if (!data?.clientSecret) {
      setLoading(false);
      return;
    }
    const clientSecret = data?.clientSecret;
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: ''
      },
      redirect: 'if_required'
    });
    if (error) {
      handleError(error);
    } else {
      setSuccess(true);
      setLoading(false);
      toast.success('Payment has been successful!');
    }
  };

  if (!stripe || !elements) {
    return (
      <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader />
      </div>
    );
  }

  return (
    <Card sx={{ padding: '20px', margin: '30px', borderRadius: '12px' }}>
      {success ? <PaymentSuccess /> : <>
        <PaymentElement />
        <AppButton
          title={!loading ? `Pay $${amount}` : 'Processing...'}
          style={{ backgroundColor: '#092031', color: '#FFFFFF', width: '100%' }}
          onClickCallback={handleSubmit}
          disabled={!stripe || !elements || loading}
        />
        {errorMessage && <div style={{ marginTop: '10px', color: 'red' }}>{errorMessage}</div>}
      </>
      }
    </Card>
  );
}
