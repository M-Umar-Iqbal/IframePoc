import { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Typography,
} from '@mui/material';
import { isEmpty } from 'lodash';
import axios from 'axios';
import toast from 'react-hot-toast';

import AppButton from './common/AppButton';
import Loader from './common/Loader';
import DeleteDialog from './modals/DeleteModal';
import EditDialog from './modals/EditModal';
import AddServiceModal from './modals/AddModal';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import ServicesCard from './cards/ServicesCard';

function ServicesMain() {
    const [serviceName, setServiceName] = useState('');
    const [serviceCostPerCall, setServiceCostPerCall] = useState('');
    const [editModalVisibilityState, setEditModalVisibilityState] = useState(false);
    const [deleteModalVisibilityState, setDeleteModalVisibilityState] = useState(false);
    const [selectedServiceData, setSelectedServiceData] = useState({});
    const [servicesData, setServicesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/v2/payment/payments`);
                console.log(response);
                if (response?.data?.payload?.data) {
                    setServicesData(response?.data?.payload?.data);
                }
            } catch (err) {
                console.log('📌 ~ fetchServices ~ err: ', err);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const submitForm = async () => {
        if (isEmpty(serviceName)) {
            toast.error('Please select service name');
            return;
        }
        if (isEmpty(serviceCostPerCall)) {
            toast.error('Please add cost');
            return;
        }
        const payload = {
            serviceName: serviceName,
            serviceCost: serviceCostPerCall,
        };
        const response = await axios.post('http://localhost:3000/v2/payment/payments', payload);
        console.log('📌 ~ submitServiceForm ~ response: ', response);
        closeDialog(); // Close the dialog after submitting the form
    };

    const onServiceEdit = (serviceData) => {
        setEditModalVisibilityState(true);
        setSelectedServiceData(serviceData);
    };

    const openDeleteModal = (serviceId) => {
        setDeleteModalVisibilityState(true);
        setSelectedServiceData(serviceId);
    };

    const closeDeleteModal = () => {
        setDeleteModalVisibilityState(false);
    };

    const closeEditModal = () => {
        setEditModalVisibilityState(false);
    };

    const editRecord = async (formData) => {
        try {
            const response = await axios.patch('http://localhost:3000/v2/payment/payments', formData);
            console.log('📌 ~ editRecord ~ formData: ', response);
        } catch (err) {
            console.log('📌 ~ editRecord ~ err: ', err);
        }
    };

    const deleteRecord = async (serviceId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/v2/payment/payments/${serviceId}`);
            console.log('📌 ~ editRecord ~ formData: ', response);
        } catch (err) {
            console.log('📌 ~ deleteRecord ~ err: ', err);
        }
    };

    return (
        <>
            <DeleteDialog open={deleteModalVisibilityState} onClose={closeDeleteModal} onDelete={deleteRecord} />
            <EditDialog open={editModalVisibilityState} onClose={closeEditModal} onUpdate={editRecord} initialData={selectedServiceData} />
            <AddServiceModal
                open={dialogOpen}
                onClose={closeDialog}
                serviceName={serviceName}
                setServiceName={setServiceName}
                serviceCostPerCall={serviceCostPerCall}
                setServiceCostPerCall={setServiceCostPerCall}
                submitForm={submitForm}
                loading={loading}
            />
            <div style={{ marginTop: '20px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Box sx={{ margin: '20px 0' }}>
                        <Typography variant='h3'>Payment Services</Typography>
                    </Box>
                    <div>
                        <AppButton
                            icon={<BsFillPlusCircleFill size={20} />}
                            style={{
                                backgroundColor: '#091F31',
                                color: 'white',
                                height: '50px'
                            }}
                            onClickCallback={openDialog}
                            title='Add New Service'
                            disabled={loading}
                        />
                    </div>
                </div>
                <hr />
                {loading ?
                    <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Loader />
                    </div>
                    : <div style={{ padding: '20px 0' }}>
                        {(
                            isEmpty(servicesData) ? <div style={{ backgroundColor: '#E5E5E5', padding: '15px', borderRadius: '12px' }}>
                                You have no services right now, add some services to view
                            </div> :
                                <Grid container spacing={2}>
                                    {servicesData?.map((service, idx) => (
                                        <Grid item xs={12} sm={6} md={4} key={idx}>
                                            <ServicesCard
                                                serviceData={service}
                                                onEditBtnClickCallback={onServiceEdit}
                                                openDeleteBtnClickCallback={openDeleteModal}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                        )}
                    </div>}
            </div>
        </>
    );
}

export default ServicesMain;
