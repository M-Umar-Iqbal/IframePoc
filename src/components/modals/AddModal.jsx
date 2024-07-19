/* eslint-disable react/prop-types */

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

import { BsFillPlusCircleFill, BsXCircle } from 'react-icons/bs';
import AppButton from '../common/AppButton';

const AddServiceModal = ({
  open,
  onClose,
  serviceName,
  setServiceName,
  serviceCostPerCall,
  setServiceCostPerCall,
  submitForm,
  loading
}) => {
  const handleServiceChange = (e) => {
    setServiceName(e.target.value);
  };

  const onCostValueChange = (event) => {
    const { value } = event.target;
    if (!isNaN(value) || value === '') {
      setServiceCostPerCall(value);
    }
  };

  return (
    <Dialog open={open} onClose={loading ? null : onClose}>
      <DialogTitle sx={{ padding: '20px 20px', backgroundColor: '#164A75', color: '#FFF' }}>Add New Service</DialogTitle>
      <DialogContent>
        <Box sx={{ paddingTop: '20px', width: '400px' }}>
          <FormControl fullWidth>
            <InputLabel id='service-name'>Service Name</InputLabel>
            <Select
              labelId='service-name'
              id='service-name'
              value={serviceName}
              label='Service Name'
              onChange={handleServiceChange}
            >
              <MenuItem value={'At_Data'}>AtData</MenuItem>
              <MenuItem value={'Click_Send'}>ClickSend</MenuItem>
              <MenuItem value={'Real_Phone_Validation'}>Real Phone Validation</MenuItem>
              <MenuItem value={'REI_Broadcast'}>REI Broadcast</MenuItem>
              <MenuItem value={'Closebot.ai'}>CloseBot.AI</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: '20px' }}>
            <InputLabel htmlFor='outlined-adornment-amount'>Cost (Per-Request)</InputLabel>
            <OutlinedInput
              value={serviceCostPerCall}
              onChange={onCostValueChange}
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
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          padding: '20px 20px',
          backgroundColor: '#DBDBD3'
        }}>
        <AppButton
          icon={<BsXCircle />}
          style={{
            backgroundColor: '#878CA8',
            color: '#fff',
            height: '50px'
          }}
          onClickCallback={onClose}
          title='Close'
        />
        <AppButton
          icon={<BsFillPlusCircleFill size={20} />}
          style={{
            backgroundColor: '#092031',
            color: '#fff',
            height: '50px',
            width: '120px'
          }}
          onClickCallback={submitForm}
          title={loading ? 'Adding ' : 'Add'}
          disabled={loading}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddServiceModal;
