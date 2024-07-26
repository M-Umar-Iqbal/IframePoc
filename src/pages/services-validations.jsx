import Grid from '@mui/material/Grid';
import AtDataServicesValidationsForm from "../components/form/AtDataServicesValidationsForm";

function ServicesValidations() {
    return (
        <div style={{ padding: "30px" }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <AtDataServicesValidationsForm />
                </Grid>
            </Grid>
        </div>
    );
}

export default ServicesValidations;
