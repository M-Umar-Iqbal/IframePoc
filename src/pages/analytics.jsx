import { Typography } from '@mui/material';
import AtDataAnalytics from '../components/AtDataAnalytics';


function Analytics() {
    return (
        <div style={{ padding: '20px 30px' }}>
            <div style={{ margin: '20px 0' }}>
                <Typography variant='h4' sx={{ margin: "5px 0" }}>Analytics Dashboard</Typography>
                <hr />
            </div>
            <AtDataAnalytics />
        </div>
    )
}

export default Analytics