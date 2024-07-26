/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { BsXCircle, BsPencilFill } from 'react-icons/bs';
import AppButton from '../common/AppButton';
import { transformServiceName } from '../../utils/client-utils';

const EditDialog = ({ open, onClose, onUpdate, initialData, loading }) => {
    const [formData, setFormData] = useState({
        serviceName: initialData?.serviceName,
        price: initialData?.price,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name === 'price') {
            if (!isNaN(value) || value === '') {
                setFormData({
                    ...formData,
                    [name]: value,
                });
            }
            return
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdate = () => {
        onUpdate({
            serviceName: formData?.serviceName,
            price: parseFloat(formData?.price)
        }, initialData?._id);
    };

    useEffect(() => {
        setFormData({
            serviceName: initialData?.serviceName,
            price: initialData?.price,
        })
    }, [initialData]);

    return (
        <Dialog open={open} onClose={loading ? null : onClose}>
            <DialogTitle sx={{ padding: '20px 20px', backgroundColor: '#164A75', color: '#FFF' }}>Edit Service</DialogTitle>
            <DialogContent sx={{ paddingTop: '20px', width: '400px' }}>
                <Box sx={{ paddingTop: '20px', width: '400px' }}>
                    <TextField
                        autoFocus
                        margin='dense'
                        name='serviceName'
                        label='Service Name'
                        type='text'
                        fullWidth
                        value={transformServiceName(formData?.serviceName)}
                        onChange={handleChange}
                        disabled
                    />
                    <FormControl fullWidth sx={{ marginTop: '20px' }}>
                        <InputLabel htmlFor='outlined-adornment-amount'>Cost (Per-Request)</InputLabel>
                        <OutlinedInput
                            value={formData.price}
                            onChange={handleChange}
                            inputprops={{
                                inputProps: {
                                    inputMode: 'decimal',
                                },
                            }}
                            variant='outlined'
                            placeholder='Cost / Per Request'
                            id='outlined-adornment-amount'
                            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                            label='Cost (Per-Request)'
                            name='price'
                            disabled={loading}
                        />
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions sx={{ padding: '20px 20px', backgroundColor: '#DBDBD3' }}>
                <AppButton
                    icon={<BsXCircle />}
                    style={{
                        backgroundColor: '#878CA8',
                        color: '#fff',
                        height: '50px'
                    }}
                    onClickCallback={onClose}
                    title='Cancel'
                    disabled={loading}
                />
                <AppButton
                    icon={<BsPencilFill />}
                    style={{
                        backgroundColor: '#3A8DBA',
                        color: '#fff',
                        height: '50px'
                    }}
                    onClickCallback={handleUpdate}
                    title={loading ? 'Updating' : 'Update'}
                    disabled={loading}
                />
            </DialogActions>
        </Dialog>
    );
};

export default EditDialog;
