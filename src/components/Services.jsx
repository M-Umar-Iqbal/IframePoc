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
import appConfig from '../utils/constants';

function ServicesMain() {
    const [serviceName, setServiceName] = useState('');
    const [serviceCostPerCall, setServiceCostPerCall] = useState(0.0);
    const [editModalVisibilityState, setEditModalVisibilityState] = useState(false);
    const [deleteModalVisibilityState, setDeleteModalVisibilityState] = useState(false);
    const [addModalVisibilityState, setAddModalVisibilityState] = useState(false);
    const [selectedServiceData, setSelectedServiceData] = useState({});
    const [servicesData, setServicesData] = useState([]);
    const [loading, setLoading] = useState(false);

    const baseURL = appConfig?.services?.baseURL;

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseURL}/v2/payment/getAllPayments`);
            if (response?.data?.payload?.data) {
                setServicesData(response?.data?.payload?.data);
            }
        } catch (err) {
            console.log('📌 ~ fetchServices ~ err: ', err);
        } finally {
            setLoading(false);
        }
    };

    const openDialog = () => {
        setAddModalVisibilityState(true);
    };

    const closeAddDialog = () => {
        setServiceCostPerCall(0.0);
        setServiceName("");
        setAddModalVisibilityState(false);
    };

    const openEditServiceModal = (serviceData) => {
        setSelectedServiceData(serviceData);
        setEditModalVisibilityState(true);
    };

    const openDeleteServiceModal = (serviceId) => {
        setSelectedServiceData({_id: serviceId});
        setDeleteModalVisibilityState(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalVisibilityState(false);
        setSelectedServiceData({});
    };

    const closeEditModal = () => {
        setEditModalVisibilityState(false);
        setSelectedServiceData({});
    };


    const addRecord = async () => {
        try {
            if (isEmpty(serviceName)) {
                toast.error('Please select service name');
                return;
            }
            const numericValue = parseFloat(serviceCostPerCall);
            if(numericValue < 0 ) {
                toast.error('Cost should be a valid number');
                return;
            }
            const payload = {
                serviceName: serviceName,
                price: numericValue,
            };
            setLoading(true);
            const response = await axios.post(`${baseURL}/v2/payment/addPayments`, payload);
            const status = response?.data?.metadata?.status;
            const message = response?.data?.metadata?.message;
            const data = response?.data?.payload.data;
            if (status === "SUCCESS") {
                toast.success(message || "Payment service added successfully");
                setServicesData((servicesData) => [...servicesData, data]);
                closeAddDialog();
            } else {
                toast.error(message || "Unable to add service");
            }
        }
        catch (err) {
            toast.error("Error fetching results");
            console.log('📌 ~ editRecord ~ err: ', err);
        } finally {
            setLoading(false);
        }
    };

    const editRecord = async (formData, serviceId) => {
        try {
            setLoading(true);
            const response = await axios.patch(`${baseURL}/v2/payment/${serviceId}`, formData);
            const status = response?.data?.metadata?.status;
            const message = response?.data?.metadata?.message;
            if(status === "SUCCESS") {
                toast.success(message);
                closeEditModal();
                fetchServices();
            } else {
                toast.error(message);
            }
        } catch (err) {
            console.log('📌 ~ editRecord ~ err: ', err);
            toast.error("Error fetching results");
        } finally {
            setLoading(false);
        }
    };

    const deleteRecord = async (serviceId) => {
        try {
            setLoading(true);
            const response = await axios.delete(`${baseURL}/v2/payment/${serviceId}`);
            const status = response?.data?.metadata?.status;
            const message = response?.data?.metadata?.message;
            if(status === "SUCCESS") {
                const filterData = servicesData?.filter((service) => service._id !== serviceId);
                toast.success(message);
                setServicesData(filterData);
                setDeleteModalVisibilityState(false);
            } else {
                toast.error(message);
            }
        } catch (err) {
            console.log('📌 ~ deleteRecord ~ err: ', err);
            toast.error("Error fetching results");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DeleteDialog
                open={deleteModalVisibilityState}
                onClose={closeDeleteModal}
                onDelete={() => deleteRecord(selectedServiceData?._id)}
                loading={loading}
            />
            <EditDialog
                open={editModalVisibilityState}
                onClose={closeEditModal}
                onUpdate={editRecord}
                initialData={selectedServiceData}
                loading={loading}
            />
            <AddServiceModal
                open={addModalVisibilityState}
                onClose={closeAddDialog}
                serviceName={serviceName}
                setServiceName={setServiceName}
                serviceCostPerCall={serviceCostPerCall}
                setServiceCostPerCall={setServiceCostPerCall}
                submitForm={addRecord}
                loading={loading}
            />
            <div style={{ marginTop: '20px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Box sx={{ margin: '20px 0' }}>
                        <Typography variant='h4'>Payment Services</Typography>
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
                                                loading={loading}
                                                serviceData={service}
                                                onEditBtnClickCallback={openEditServiceModal}
                                                openDeleteBtnClickCallback={openDeleteServiceModal}
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
