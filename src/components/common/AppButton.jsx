import { Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
function AppButton({ title, onClickCallback, disabled, variant='contained', color}) {
    return (
        <Button
            sx={{marginRight: "4px"}}
            disabled={disabled}
            onClick={onClickCallback}
            variant={variant}
            color={color}
        >
        {title}
        </Button>
    )
}

export default AppButton