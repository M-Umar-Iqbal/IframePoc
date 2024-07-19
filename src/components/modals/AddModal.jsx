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
import AppButton from '../common/AppButton';
import { BsFillPlusCircleFill, BsXCircle } from 'react-icons/bs';

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

  const onCostValueChange = (e) => {
    setServiceCostPerCall(e.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
              <MenuItem value={'at-data'}>AtData</MenuItem>
              <MenuItem value={'click-send'}>ClickSend</MenuItem>
              <MenuItem value={'real-phone-validation'}>Real Phone Validation</MenuItem>
              <MenuItem value={'rei-broadcast'}>REI Broadcast</MenuItem>
              <MenuItem value={'close-bot-ai'}>CloseBot.AI</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: '20px' }}>
            <InputLabel htmlFor='outlined-adornment-amount'>Cost</InputLabel>
            <OutlinedInput
              value={serviceCostPerCall}
              onChange={onCostValueChange}
              variant='outlined'
              type='number'
              placeholder='Cost / Per Call'
              id='outlined-adornment-amount'
              startAdornment={<InputAdornment position='start'>$</InputAdornment>}
              label='Cost'
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
          title='Close'
        />
        <AppButton
          icon={<BsFillPlusCircleFill size={20} />}
          style={{
            backgroundColor: '#092031',
            color: '#fff',
            height: '50px'
          }}
          onClickCallback={submitForm}
          title='Add'
          disabled={loading}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddServiceModal;
