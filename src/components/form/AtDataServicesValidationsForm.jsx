import { useState } from 'react';
import AppButton from '../common/AppButton';
import CustomTextField from '../common/TextField';
import validationUtils from '../../utils/validation-utils';
import appConfig from '../../utils/constants';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Card, Typography } from '@mui/material';

function AtDataServicesValidationsForm() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { validateEmail } = validationUtils;
    const baseURL = appConfig?.services?.baseURL;

    const validateAtData = async (event) => {
        event.preventDefault(); // Prevent default form submission
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Please use a valid email to validate by using At-Data');
            return;
        }
        setLoading(true)
        try {
            const response = await axios.post(`${baseURL}/v2/transactions/process`);
            const data = response?.data?.payload?.data;
            if (data) {
                toast.success('Email has been validated using At Data successfully!');
                return;
            }

        } catch (err) {
            console.log('📌 ~ validateAtData ~ err: ', err);
            toast.error('Unable to validate email via At Data');
        } finally {
            setLoading(false)
        }
    };

    const onDataChange = (event) => {
        const { target: { value } } = event;
        setEmail(value);
    };

    return (
        <Card sx={{ padding: '20px', borderRadius: '12px', backgroundColor: '#FFF' }}>
            <Typography variant='h6' sx={{ padding: 0, margin: 0, color: '#000' }}>Validate Your Emails using At Data</Typography>
            <form onSubmit={validateAtData}>
                <CustomTextField label={'Email'} placeholder={'e.g. user@gmail.com'} onChange={onDataChange} />
                <div style={{ marginTop: '10px' }}>
                    <AppButton
                        disabled={loading}
                        style={{
                            backgroundColor: '#092031',
                            color: '#FFF',
                            width: '100%'
                        }}
                        title='Validate Email'
                        onClickCallback={validateAtData} />
                </div>
            </form>
        </Card>
    );
}

export default AtDataServicesValidationsForm;
