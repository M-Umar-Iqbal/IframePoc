import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import AtDataServicesValidationsForm from "../components/form/AtDataServicesValidationsForm";

function ServicesValidations() {
    return (
        <>
            <div style={{ padding: "30px" }}>
                <div style={{ margin: '20px 0' }}>
                    <Typography variant='h4' sx={{ margin: "5px 0" }}>Validation Services</Typography>
                    <hr />
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <AtDataServicesValidationsForm />
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default ServicesValidations;
