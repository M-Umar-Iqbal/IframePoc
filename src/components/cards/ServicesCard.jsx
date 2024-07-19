/* eslint-disable react/prop-types */
import { Card, CardActions, CardContent, Typography } from '@mui/material'
import { BsPencilFill, BsTrash } from 'react-icons/bs'
import { MdOutlineMiscellaneousServices } from 'react-icons/md'
import AppButton from '../common/AppButton'
import { transformServiceName } from '../../utils/client-utils'

function ServicesCard({ serviceData, loading, onEditBtnClickCallback, openDeleteBtnClickCallback }) {
    return (
        <Card sx={{ borderRadius: '12px', padding: '25px', backgroundColor: '#154A75' }}>
            <CardContent sx={{ padding: 0 }}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
                    <MdOutlineMiscellaneousServices size={30} style={{ marginRight: '5px', color: '#fff' }} />
                    <h3 style={{ margin: 0, padding: 0, color: '#fff' }}>
                        {transformServiceName(serviceData?.serviceName)}
                    </h3>
                </div>
                <Typography variant='h6' sx={{ color: '#fff', marginTop: '8px' }}>
                    $ {serviceData?.price}
                </Typography>
            </CardContent>
            <hr />
            <CardActions style={{ padding: '10px 0px 0px 0px' }}>
                <AppButton
                    icon={<BsPencilFill />}
                    style={{
                        backgroundColor: '#3A8DBA',
                        color: '#fff',
                        height: '50px'
                    }}
                    onClickCallback={() => onEditBtnClickCallback(serviceData)}
                    title={'Edit'}
                    disabled={loading}
                />
                <AppButton
                    icon={<BsTrash />}
                    style={{
                        backgroundColor: '#F35144',
                        color: '#fff',
                        height: '50px'
                    }}
                    onClickCallback={() => openDeleteBtnClickCallback(serviceData?._id)}
                    title='Delete'
                    disabled={loading}
                />
            </CardActions>
        </Card>
    )
}

export default ServicesCard;