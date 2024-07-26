import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Card, Typography } from '@mui/material';
import { isEmpty } from 'lodash';

import AppButton from '../common/AppButton';
import CustomTextField from '../common/TextField';
import appConfig from '../../utils/constants';
import localStorageUtils from '../../utils/local-storage-utils';

function AtDataServicesValidationsForm() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [validationStatusDetails, setValidationStatusDetails] = useState({});

    const baseURL = appConfig?.services?.baseURL;
    const resetForm = () => {
        setEmail("");
    }
    const validateAtData = async (event) => {
        event.preventDefault(); // Prevent default form submission
        if (isEmpty(email.trim())) {
            toast.error('Please use an email to validate');
            return;
        }
        setLoading(true);
        try {
            const accId = localStorageUtils.getItem('accId');
            const payload = {
                email: email,
                subAccount: accId,
                service: "At_Data"
            }
            const response = await axios.post(`${baseURL}/v2/transactions/process`, payload);
            const data = response?.data?.payload?.data;
            if (data) {
                toast.success('Email has been validated successfully!');
                resetForm();
                setValidationStatusDetails(data?.safe_to_send);
                return;
            } else {
                toast.error('Unable to validate email');
            }
        } catch (err) {
            console.log('📌 ~ validateAtData ~ err: ', err);
            toast.error('Unable to validate email');
        } finally {
            setLoading(false);
        }
    };

    const onDataChange = (event) => {
        const { target: { value } } = event;
        setEmail(value);
    };

    return (
        <Card sx={{ padding: '20px', borderRadius: '12px', backgroundColor: '#FFF' }}>
            <Typography variant='h6' sx={{ padding: 0, margin: 0, color: '#000' }}>Validate your emails using At Data</Typography>
            <form onSubmit={validateAtData}>
                <CustomTextField label={'Email'}
                    value={email}
                    placeholder={'Enter email to validate'}
                    onChange={onDataChange} />
                {!isEmpty(validationStatusDetails) && <div
                    style={{
                        backgroundColor: "#E5E5E5",
                        padding: "10px", borderRadius: "12px",
                        overflow: "hidden",
                        textWrap: "initial",
                        wordwrap: "break-word",
                        whiteSpace: "pre-wrap",
                        overflowWrap: "break-word",
                    }}
                >
                    {JSON.stringify(validationStatusDetails)}
                </div>}
                <div style={{ marginTop: '10px' }}>
                    <AppButton
                        disabled={loading}
                        style={{
                            backgroundColor: '#092031',
                            color: '#FFF',
                            width: '100%'
                        }}
                        title={loading ? 'Validating... ' : 'Validate Email'}
                        onClickCallback={validateAtData} />
                </div>
            </form>
        </Card>
    );
}

export default AtDataServicesValidationsForm;
