import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AppButton from '../common/AppButton';

// eslint-disable-next-line react/prop-types
const DeleteDialog = ({ open, onClose, onDelete }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ padding: '20px 20px', backgroundColor: '#F35144', color: '#FFF' }}>Delete Confirmation</DialogTitle>
            <DialogContent>
                <Box sx={{ paddingTop: '20px', width: '400px' }}>
                    Are you sure you want to delete this service?
                </Box>
            </DialogContent>
            <DialogActions sx={{
                padding: '20px 20px',
                backgroundColor: '#DBDBD3'
            }}>
                <AppButton
                    style={{
                        backgroundColor: '#878CA8',
                        color: '#fff',
                        height: '50px',
                        width: '90px'
                    }}
                    onClickCallback={onClose}
                    title='No'
                />
                <AppButton
                    style={{
                        backgroundColor: '#F35144',
                        color: '#fff',
                        height: '50px',
                        width: '90px'
                    }}
                    onClickCallback={onDelete}
                    title='Yes'
                />
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialog;
