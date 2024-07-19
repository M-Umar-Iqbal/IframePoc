/* eslint-disable react/prop-types */
import { Card, CardActions, CardContent, Typography } from "@mui/material"
import { BsPencilFill, BsTrash } from "react-icons/bs"
import { MdOutlineMiscellaneousServices } from "react-icons/md"
import AppButton from "../common/AppButton"

function ServicesCard({ serviceData, onEditBtnClickCallback, openDeleteBtnClickCallback }) {
    return (
        <Card sx={{ borderRadius: "12px", padding: "25px", backgroundColor: "#154A75" }}>
            <CardContent sx={{ padding: 0 }}>
                <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>
                    <MdOutlineMiscellaneousServices size={30} style={{ marginRight: "5px", color: "#fff" }} />
                    <h3 style={{ margin: 0, padding: 0, color: "#fff" }}>
                        {serviceData?.serviceName}
                    </h3>
                </div>
                <Typography variant="h6" sx={{ color: "#fff", marginTop: "8px" }}>
                    ${serviceData?.price}
                </Typography>
            </CardContent>
            <hr />
            <CardActions style={{ padding: "10px 0px 0px 0px" }}>
                <AppButton
                    icon={<BsPencilFill />}
                    style={{
                        backgroundColor: "#3A8DBA",
                        color: "#fff",
                        height: '50px'
                    }}
                    onClickCallback={() => onEditBtnClickCallback(serviceData)}
                    title={"Edit"}
                />
                <AppButton
                    icon={<BsTrash />}
                    style={{
                        backgroundColor: "#F35144",
                        color: "#fff",
                        height: '50px'
                    }}
                    onClickCallback={() => openDeleteBtnClickCallback(serviceData?._id)}
                    title="Delete"
                />
            </CardActions>
        </Card>
    )
}

export default ServicesCard;